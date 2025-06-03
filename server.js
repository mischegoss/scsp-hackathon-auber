const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
    ], // Added 3002 for Docusaurus
    credentials: true,
  }),
)
app.use(express.json())

// Claude API endpoint
app.post('/api/analyze-data', async (req, res) => {
  try {
    const { data } = req.body

    console.log('Received data for analysis:', Object.keys(data))

    // Prepare the prompt for Claude
    const prompt = `You are an AI assistant analyzing community health data for a narcan distribution program in rural West Virginia. Your role is to identify critical patterns and provide actionable recommendations for public health officials.

Here's the current data:

**Weekly Metrics (Last 7 Days):**
- Overdose Deaths: ${data.weeklyMetrics?.overdoseDeaths || 0}
- EMS Narcan Uses: ${data.weeklyMetrics?.emsNarcanUses || 0}
- Community Requests: ${data.weeklyMetrics?.communityRequests || 0}
- Training Requests: ${data.weeklyMetrics?.trainingRequests || 0}

**Resource Locations:**
${
  data.locations
    ?.map(
      loc =>
        `- ${loc.name} (${loc.zipCode}): ${loc.status} status, ${
          loc.stock
        } units in stock${
          loc.expiring > 0 ? `, ${loc.expiring} expiring soon` : ''
        }`,
    )
    .join('\n') || 'No location data available'
}

**Recent Community Requests:**
${
  data.recentRequests
    ?.map(
      req =>
        `- Zip ${req.zipCode}: ${req.needs.join(', ')} (Urgency: ${
          req.urgency
        }/5) - ${req.time}`,
    )
    .join('\n') || 'No recent requests'
}

Please analyze this data and provide:

1. **Critical Alerts** (if any): Immediate issues requiring action
2. **Resource Recommendations**: Specific actions for stock distribution
3. **Geographic Analysis**: Areas with coverage gaps or high need
4. **Trends**: Patterns that indicate emerging problems

Format your response as a JSON object with this structure:
{
  "alerts": [
    {
      "type": "critical|warning|info",
      "title": "Alert Title",
      "message": "Detailed description",
      "action": "Recommended action",
      "timestamp": "Current time"
    }
  ],
  "recommendations": [
    "Specific actionable recommendation 1",
    "Specific actionable recommendation 2"
  ],
  "insights": [
    "Key insight about patterns or trends",
    "Geographic or temporal patterns identified"
  ]
}

Focus on actionable insights that help rural health leaders make evidence-based decisions. Remember: we're building trust with communities (help, not surveillance) and getting narcan into the hands of people who can use it when EMS response times are 5-7 minutes.`

    // Make request to Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error(
        `Claude API error: ${response.status} ${response.statusText}`,
      )
    }

    const claudeResponse = await response.json()
    const analysisText = claudeResponse.content[0].text

    console.log('Claude response:', analysisText)

    // Try to parse Claude's JSON response
    let analysis
    try {
      // Extract JSON from Claude's response (it might have extra text)
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('No JSON found in response')
      }
    } catch (parseError) {
      console.error('Failed to parse Claude response as JSON:', parseError)
      // Fallback response if JSON parsing fails
      analysis = {
        alerts: [
          {
            type: 'info',
            title: 'Analysis Complete',
            message:
              'Claude has analyzed your data. See recommendations below.',
            action: 'Review detailed analysis',
            timestamp: new Date().toLocaleString(),
          },
        ],
        recommendations: [
          'Data analysis completed successfully',
          'Check server logs for detailed insights',
        ],
        insights: [
          'Raw analysis available in server response',
          analysisText.substring(0, 200) + '...',
        ],
      }
    }

    // Add timestamps to alerts if missing
    analysis.alerts =
      analysis.alerts?.map(alert => ({
        ...alert,
        timestamp: alert.timestamp || new Date().toLocaleString(),
      })) || []

    res.json({
      success: true,
      analysis,
      rawResponse: analysisText, // Include for debugging
    })
  } catch (error) {
    console.error('Error calling Claude API:', error)

    // Return a fallback analysis if the API fails
    res.status(500).json({
      success: false,
      error: error.message,
      fallbackAnalysis: {
        alerts: [
          {
            type: 'warning',
            title: 'API Analysis Unavailable',
            message:
              'Unable to connect to Claude API. Using fallback analysis based on data patterns.',
            action: 'Check API configuration and try again',
            timestamp: new Date().toLocaleString(),
          },
        ],
        recommendations: [
          'Verify Claude API key is configured correctly',
          'Check network connectivity',
          'Review data structure for analysis',
        ],
        insights: [
          'Fallback mode active - manual review recommended',
          'API integration requires troubleshooting',
        ],
      },
    })
  }
})

// Load knowledge base
const fs = require('fs')
const path = require('path')

// Load knowledge base JSON from src/data directory
let knowledgeBase = {}
try {
  const knowledgeBasePath = path.join(
    __dirname,
    'src',
    'data',
    'dashboard-knowledge-base.json',
  )
  knowledgeBase = JSON.parse(fs.readFileSync(knowledgeBasePath, 'utf8'))
  console.log('Knowledge base loaded successfully')
} catch (error) {
  console.warn(
    'Knowledge base not found at src/data/, using limited definitions',
  )
  knowledgeBase = {
    metrics: {
      overdose_deaths: {
        definition: 'Confirmed fatalities attributed to drug overdoses',
      },
      ems_narcan_administered: {
        definition: 'EMS-documented naloxone administrations',
      },
    },
  }
}

// Ask Claude about specific data points
app.post('/api/ask-question', async (req, res) => {
  try {
    const { question, data } = req.body

    console.log('=== ASK QUESTION DEBUG ===')
    console.log('Question received:', question)
    console.log('Data keys:', Object.keys(data || {}))
    console.log('API Key present:', !!process.env.CLAUDE_API_KEY)

    // Test response first - comment this out after testing
    /*
    res.json({
      success: true,
      answer: `Test response for: "${question}". This is a placeholder to test the endpoint is working.`,
      question: question,
      timestamp: new Date().toISOString()
    });
    return;
    */

    // Create an enhanced prompt with knowledge base
    const prompt = `You are a data analyst assistant for a rural health dashboard. You can answer questions about:

1. THE CURRENT DASHBOARD DATA (shown below)
2. DEFINITIONS AND TERMS (from the knowledge base below)

You MUST ONLY use information from these two sources. DO NOT make assumptions or provide information not directly available.

=== CURRENT DASHBOARD DATA ===
- Week Overview: ${data.weeklyMetrics?.overdoseDeaths || 0} overdose deaths, ${
      data.weeklyMetrics?.emsNarcanUses || 0
    } EMS uses, ${data.weeklyMetrics?.communityRequests || 0} community requests
- Alerts: ${
      data.alerts
        ?.map(a => `${a.type} - ${a.title}: ${a.message}`)
        .join('; ') || 'None'
    }
- Locations: ${
      data.locations
        ?.map(
          loc =>
            `${loc.name} (${loc.status}, ${loc.stock} stock${
              loc.expiring > 0 ? `, ${loc.expiring} expiring` : ''
            })`,
        )
        .join('; ') || 'None'
    }
- Recent Requests: ${
      data.recentRequests
        ?.map(
          req =>
            `Zip ${req.zipCode} needs ${req.needs.join(',')} (urgency ${
              req.urgency
            })`,
        )
        .join('; ') || 'None'
    }

=== KNOWLEDGE BASE DEFINITIONS ===
${JSON.stringify(knowledgeBase, null, 2)}

=== QUESTION ===
"${question}"

=== INSTRUCTIONS ===
1. For questions about current data/numbers: Reference the dashboard data above
2. For questions about definitions/meanings: Use the knowledge base definitions
3. For questions combining both: Use both sources appropriately
4. If you cannot answer from these sources, say "I can only answer questions about the current dashboard data or explain terms defined in our knowledge base"
5. Be specific and cite your sources (e.g., "According to the current data..." or "The definition shows...")
6. Keep responses clear and actionable for rural health leaders

Provide a direct, helpful answer in 2-4 sentences.`

    console.log('Making request to Claude API...')

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 400,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    })

    console.log('Claude API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Claude API error response:', errorText)
      throw new Error(`Claude API error: ${response.status} - ${errorText}`)
    }

    const claudeResponse = await response.json()
    const answer = claudeResponse.content[0].text.trim()

    console.log('Claude answer received:', answer.substring(0, 100) + '...')

    res.json({
      success: true,
      answer: answer,
      question: question,
      timestamp: new Date().toISOString(),
      sources_used: {
        current_data: true,
        knowledge_base: true,
      },
    })
  } catch (error) {
    console.error('=== ASK QUESTION ERROR ===')
    console.error('Error details:', error.message)
    console.error('Full error:', error)

    res.status(500).json({
      success: false,
      answer:
        "I'm unable to process your question right now. Please check that the question relates to the current dashboard data or asks about terms we have definitions for.",
      error: error.message,
      debug: {
        hasApiKey: !!process.env.CLAUDE_API_KEY,
        hasKnowledgeBase: Object.keys(knowledgeBase).length > 0,
      },
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    env: {
      hasClaudeKey: !!process.env.CLAUDE_API_KEY,
      port: PORT,
    },
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
  console.log(`Claude API key configured: ${!!process.env.CLAUDE_API_KEY}`)
})

module.exports = app
