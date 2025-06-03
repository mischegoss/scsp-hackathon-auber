import React, { useState } from 'react'

// Data timestamp for "last updated" display - 2 hours ago
const DATA_LAST_UPDATED = new Date(Date.now() - 2 * 60 * 60 * 1000)

// Ask Claude Data Component
const AskClaudeData = ({ currentData }) => {
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [conversationHistory, setConversationHistory] = useState([])

  const suggestedQuestions = [
    'What counts as an overdose death in this data?',
    'Who gets counted in EMS narcan administered?',
    'What do the urgency levels mean?',
    'How many overdose deaths do we have this week?',
    'Which locations are out of stock?',
    'What areas have the highest urgency requests?',
    'How many community requests did we get this week?',
  ]

  const MessageIcon = ({ style }) => (
    <svg style={style} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.439L3 21l2.439-5.094A7.966 7.966 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z'
      />
    </svg>
  )

  const SendIcon = ({ style }) => (
    <svg style={style} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
      />
    </svg>
  )

  const handleSubmit = async (questionText = question) => {
    if (!questionText.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:3001/api/ask-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionText, data: currentData }),
      })

      const result = await response.json()

      const newEntry = {
        id: Date.now(),
        question: questionText,
        response: result.answer,
        timestamp: new Date().toLocaleString(),
      }

      setConversationHistory(prev => [newEntry, ...prev])
      setResponse(result.answer)
      setQuestion('')
    } catch (error) {
      setResponse({
        type: 'error',
        message: 'Unable to get response from Claude. Please try again.',
        suggestion: 'Check that the server is running on port 3001',
      })
    }
    setIsLoading(false)
  }

  const handleQuestionClick = suggestedQuestion => {
    setQuestion(suggestedQuestion)
    handleSubmit(suggestedQuestion)
  }

  return (
    <div
      style={{
        backgroundColor: '#1f2937',
        borderRadius: '0.5rem',
        border: '1px solid #374151',
        marginTop: '1.5rem',
      }}
    >
      <div
        style={{
          padding: '1.5rem',
          borderBottom: '1px solid #374151',
        }}
      >
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            margin: 0,
          }}
        >
          <MessageIcon
            style={{
              width: '1.25rem',
              height: '1.25rem',
              color: '#60a5fa',
              marginRight: '0.5rem',
            }}
          />
          Ask Claude About This Data
        </h3>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#9ca3af',
            margin: '0.25rem 0 0 0',
          }}
        >
          Ask questions about the current dashboard data. Claude will only
          reference the knowledge base and official data.
        </p>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <input
            type='text'
            value={question}
            onChange={e => setQuestion(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSubmit()}
            placeholder='Ask about the data shown in this dashboard...'
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#374151',
              border: '1px solid #4b5563',
              borderRadius: '0.375rem',
              color: 'white',
              fontSize: '0.875rem',
            }}
          />
          <button
            onClick={() => handleSubmit()}
            disabled={isLoading || !question.trim()}
            style={{
              padding: '0.75rem',
              backgroundColor:
                isLoading || !question.trim() ? '#4b5563' : '#2563eb',
              border: 'none',
              borderRadius: '0.375rem',
              color: 'white',
              cursor: isLoading || !question.trim() ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? (
              <div
                style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
            ) : (
              <SendIcon style={{ width: '1rem', height: '1rem' }} />
            )}
          </button>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              color: '#9ca3af',
              margin: '0 0 0.5rem 0',
            }}
          >
            Quick questions:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {suggestedQuestions.map((q, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(q)}
                disabled={isLoading}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#374151',
                  border: '1px solid #4b5563',
                  borderRadius: '0.25rem',
                  color: '#d1d5db',
                  fontSize: '0.75rem',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {response && (
          <div
            style={{
              backgroundColor: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1rem',
            }}
          >
            <h4
              style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#60a5fa',
                margin: '0 0 0.5rem 0',
              }}
            >
              Claude's Response:
            </h4>
            <div
              style={{
                color: '#e2e8f0',
                fontSize: '0.875rem',
                lineHeight: '1.5',
              }}
            >
              {typeof response === 'string' ? (
                <p style={{ margin: 0 }}>{response}</p>
              ) : (
                <div>
                  <p style={{ color: '#fca5a5', margin: '0 0 0.5rem 0' }}>
                    {response.message}
                  </p>
                  {response.suggestion && (
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: '#9ca3af',
                        margin: 0,
                      }}
                    >
                      {response.suggestion}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {conversationHistory.length > 0 && (
          <div>
            <h4
              style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                margin: '0 0 0.75rem 0',
              }}
            >
              Recent Questions ({conversationHistory.length}):
            </h4>
            <div
              style={{
                maxHeight: '150px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {conversationHistory.slice(0, 2).map(entry => (
                <div
                  key={entry.id}
                  style={{
                    backgroundColor: '#374151',
                    borderRadius: '0.375rem',
                    padding: '0.75rem',
                    border: '1px solid #4b5563',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.75rem',
                      color: '#d1d5db',
                      margin: '0 0 0.25rem 0',
                    }}
                  >
                    Q: {entry.question}
                  </p>
                  <p
                    style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}
                  >
                    A:{' '}
                    {typeof entry.response === 'string'
                      ? entry.response.substring(0, 80) + '...'
                      : 'Error'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const NarcanDashboard = () => {
  const [dataState, setDataState] = useState('baseline')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Icon components
  const AlertTriangle = ({ style }) => (
    <svg style={style} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
      />
    </svg>
  )

  const MapPin = ({ style }) => (
    <svg style={style} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
      />
    </svg>
  )

  const Package = ({ style }) => (
    <svg style={style} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
      />
    </svg>
  )

  const Users = ({ style }) => (
    <svg style={style} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z'
      />
    </svg>
  )

  const TrendingUp = ({ style }) => (
    <svg style={style} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
      />
    </svg>
  )

  const Clock = ({ style }) => (
    <svg style={style} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <circle
        cx='12'
        cy='12'
        r='10'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 6v6l4 2'
      />
    </svg>
  )

  const Activity = ({ style }) => (
    <svg style={style} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      />
    </svg>
  )

  const BarChart3 = ({ style }) => (
    <svg style={style} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      />
    </svg>
  )

  const Zap = ({ style }) => (
    <svg style={style} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M13 10V3L4 14h7v7l9-11h-7z'
      />
    </svg>
  )

  // Data objects with static timestamps
  const baselineData = {
    weeklyMetrics: {
      overdoseDeaths: 0,
      emsNarcanUses: 3,
      communityRequests: 4,
      trainingRequests: 2,
    },
    alerts: [
      {
        id: 1,
        type: 'info',
        title: 'Routine Stock Check',
        message: 'All distribution centers adequately stocked',
        action: 'Continue monitoring',
        timestamp: '1 hour ago',
        alertTime: new Date(Date.now() - 3 * 60 * 60 * 1000),
      },
    ],
    locations: [
      {
        name: 'Wheeling Clinic',
        status: 'available',
        stock: 12,
        expiring: 1,
        zipCode: '26003',
        type: 'distribution',
      },
      {
        name: 'Ohio County Health Dept',
        status: 'available',
        stock: 8,
        expiring: 0,
        zipCode: '26003',
        type: 'distribution',
      },
      {
        name: 'Elm Grove Pharmacy',
        status: 'available',
        stock: 6,
        expiring: 1,
        zipCode: '26003',
        type: 'distribution',
      },
      {
        name: 'Valley Grove Community Center',
        status: 'available',
        stock: 4,
        expiring: 0,
        zipCode: '26060',
        type: 'distribution',
      },
      {
        name: 'Wheeling Hospital',
        status: 'available',
        stock: 8,
        expiring: 2,
        zipCode: '26003',
        type: 'training',
      },
      {
        name: 'Ohio County EMS',
        status: 'available',
        stock: 12,
        expiring: 0,
        zipCode: '26003',
        type: 'training',
      },
    ],
    recentRequests: [
      {
        zipCode: '26003',
        needs: ['narcan-access'],
        urgency: 2,
        time: '2 hours ago',
      },
      {
        zipCode: '26060',
        needs: ['narcan-training'],
        urgency: 1,
        time: '4 hours ago',
      },
      {
        zipCode: '26003',
        needs: ['narcan-access'],
        urgency: 2,
        time: '6 hours ago',
      },
    ],
  }

  const crisisData = {
    weeklyMetrics: {
      overdoseDeaths: 1,
      emsNarcanUses: 7,
      communityRequests: 8,
      trainingRequests: 2,
    },
    alerts: [
      {
        id: 1,
        type: 'critical',
        title: 'Stock Depletion Crisis',
        message:
          '26003 has lost 50% of distribution capacity. Elm Grove Pharmacy out of stock.',
        action: 'Immediate restocking required',
        timestamp: '2 hours ago',
        alertTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      },
      {
        id: 2,
        type: 'warning',
        title: 'Geographic Coverage Gap',
        message:
          '26060 has zero accessible resources despite 3 high-urgency requests',
        action: 'Consider mobile distribution',
        timestamp: '4 hours ago',
        alertTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
      },
    ],
    locations: [
      {
        name: 'Wheeling Clinic',
        status: 'available',
        stock: 8,
        expiring: 2,
        zipCode: '26003',
        type: 'distribution',
      },
      {
        name: 'Ohio County Health Dept',
        status: 'low',
        stock: 3,
        expiring: 1,
        zipCode: '26003',
        type: 'distribution',
      },
      {
        name: 'Elm Grove Pharmacy',
        status: 'out',
        stock: 0,
        expiring: 0,
        zipCode: '26003',
        type: 'distribution',
      },
      {
        name: 'Valley Grove Community Center',
        status: 'out',
        stock: 0,
        expiring: 0,
        zipCode: '26060',
        type: 'distribution',
      },
      {
        name: 'Wheeling Hospital',
        status: 'available',
        stock: 6,
        expiring: 3,
        zipCode: '26003',
        type: 'training',
      },
      {
        name: 'Ohio County EMS',
        status: 'available',
        stock: 10,
        expiring: 0,
        zipCode: '26003',
        type: 'training',
      },
    ],
    recentRequests: [
      {
        zipCode: '26074',
        needs: ['narcan-access', 'narcan-training'],
        urgency: 5,
        time: '1 hour ago',
      },
      {
        zipCode: '26003',
        needs: ['narcan-access'],
        urgency: 3,
        time: '3 hours ago',
      },
      {
        zipCode: '26059',
        needs: ['narcan-training'],
        urgency: 5,
        time: '6 hours ago',
      },
      {
        zipCode: '26074',
        needs: ['narcan-access'],
        urgency: 3,
        time: '8 hours ago',
      },
    ],
  }

  const currentData = dataState === 'baseline' ? baselineData : crisisData

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setDataState('analyzed')
      setIsAnalyzing(false)
    }, 2000)
  }

  const getStatusColorInline = status => {
    switch (status) {
      case 'available':
        return {
          backgroundColor: '#dcfce7',
          color: '#166534',
          borderColor: '#bbf7d0',
        }
      case 'low':
        return {
          backgroundColor: '#fefce8',
          color: '#a16207',
          borderColor: '#fde047',
        }
      case 'out':
        return {
          backgroundColor: '#fef2f2',
          color: '#dc2626',
          borderColor: '#fecaca',
        }
      default:
        return {
          backgroundColor: '#f3f4f6',
          color: '#374151',
          borderColor: '#d1d5db',
        }
    }
  }

  const getUrgencyColorInline = urgency => {
    if (urgency >= 5) return '#ef4444'
    if (urgency >= 3) return '#eab308'
    return '#22c55e'
  }

  return (
    <div
      style={{ minHeight: '100vh', backgroundColor: '#111827', color: 'white' }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#1f2937',
          borderBottom: '1px solid #374151',
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                margin: 0,
              }}
            >
              <Activity
                style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  marginRight: '0.5rem',
                  color: '#60a5fa',
                }}
              />
              Ohio County Narcan Operations Center
            </h1>
            <p
              style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                marginTop: '0.25rem',
                margin: 0,
              }}
            >
              Designed for real-time response. Powered by community data and AI.
            </p>
            <p
              style={{
                color: '#6b7280',
                fontSize: '0.75rem',
                marginTop: '0.25rem',
                margin: '0.25rem 0 0 0',
              }}
            >
              Data last updated: {DATA_LAST_UPDATED.toLocaleString()}
            </p>
          </div>
          <div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || dataState === 'analyzed'}
              style={{
                padding: '0.5rem 1.5rem',
                backgroundColor:
                  dataState === 'analyzed' || isAnalyzing
                    ? '#4b5563'
                    : '#2563eb',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                transition: 'background-color 0.2s',
                border: 'none',
                color: 'white',
                cursor:
                  dataState === 'analyzed' || isAnalyzing
                    ? 'not-allowed'
                    : 'pointer',
              }}
              onMouseOver={e => {
                if (dataState !== 'analyzed' && !isAnalyzing) {
                  e.target.style.backgroundColor = '#1d4ed8'
                }
              }}
              onMouseOut={e => {
                if (dataState !== 'analyzed' && !isAnalyzing) {
                  e.target.style.backgroundColor = '#2563eb'
                }
              }}
            >
              {isAnalyzing ? (
                <>
                  <div
                    style={{
                      width: '1rem',
                      height: '1rem',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '0.5rem',
                    }}
                  ></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap
                    style={{
                      width: '1rem',
                      height: '1rem',
                      marginRight: '0.5rem',
                    }}
                  />
                  Analyze with Claude
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={{ padding: '1.5rem' }}>
        {/* Alerts Row */}
        {currentData.alerts.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {currentData.alerts.map(alert => (
                <div
                  key={alert.id}
                  style={{
                    borderRadius: '0.5rem',
                    borderLeft: `4px solid ${
                      alert.type === 'critical'
                        ? '#ef4444'
                        : alert.type === 'warning'
                        ? '#eab308'
                        : '#3b82f6'
                    }`,
                    padding: '1rem',
                    backgroundColor:
                      alert.type === 'critical'
                        ? '#fef2f2'
                        : alert.type === 'warning'
                        ? '#fefce8'
                        : '#eff6ff',
                    color: '#111827',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AlertTriangle
                          style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            marginRight: '0.5rem',
                            color:
                              alert.type === 'critical'
                                ? '#dc2626'
                                : alert.type === 'warning'
                                ? '#d97706'
                                : '#2563eb',
                          }}
                        />
                        <h3
                          style={{
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            color: '#111827',
                            margin: 0,
                          }}
                        >
                          {alert.title}
                        </h3>
                      </div>
                      <p
                        style={{
                          color: '#374151',
                          marginTop: '0.25rem',
                          margin: '0.25rem 0',
                        }}
                      >
                        {alert.message}
                      </p>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: '#2563eb',
                          marginTop: '0.5rem',
                          margin: '0.5rem 0 0 0',
                        }}
                      >
                        → {alert.action}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        textAlign: 'right',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '0.25rem',
                        }}
                      >
                        <Clock
                          style={{
                            width: '1rem',
                            height: '1rem',
                            marginRight: '0.25rem',
                          }}
                        />
                        {alert.timestamp}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                        Alert:{' '}
                        {alert.alertTime
                          ? alert.alertTime.toLocaleString()
                          : 'Unknown time'}
                      </div>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              border: '1px solid #374151',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#7f1d1d',
                  borderRadius: '0.5rem',
                }}
              >
                <TrendingUp
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    color: '#fca5a5',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                7 days
              </span>
            </div>
            <div>
              <p
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0,
                }}
              >
                {currentData.weeklyMetrics.overdoseDeaths}
              </p>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>
                Overdose Deaths
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              border: '1px solid #374151',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#1e3a8a',
                  borderRadius: '0.5rem',
                }}
              >
                <Package
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    color: '#93c5fd',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                7 days
              </span>
            </div>
            <div>
              <p
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0,
                }}
              >
                {currentData.weeklyMetrics.emsNarcanUses}
              </p>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>
                EMS Narcan Uses
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              border: '1px solid #374151',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#14532d',
                  borderRadius: '0.5rem',
                }}
              >
                <Users
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    color: '#86efac',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                7 days
              </span>
            </div>
            <div>
              <p
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0,
                }}
              >
                {currentData.weeklyMetrics.communityRequests}
              </p>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>
                Community Requests
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              border: '1px solid #374151',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <div
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#581c87',
                  borderRadius: '0.5rem',
                }}
              >
                <BarChart3
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    color: '#c084fc',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                Total
              </span>
            </div>
            <div>
              <p
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0,
                }}
              >
                {currentData.locations.reduce((sum, loc) => sum + loc.stock, 0)}
              </p>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>
                Available Stock
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '1.5rem',
          }}
        >
          {/* Resource Status Map */}
          <div
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '0.5rem',
              border: '1px solid #374151',
            }}
          >
            <div
              style={{ padding: '1.5rem', borderBottom: '1px solid #374151' }}
            >
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  margin: 0,
                }}
              >
                <MapPin
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    color: '#60a5fa',
                    marginRight: '0.5rem',
                  }}
                />
                Resource Locations Status
              </h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1rem',
                }}
              >
                {currentData.locations.map((location, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#374151',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      border: '1px solid #4b5563',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <div>
                        <h4
                          style={{
                            fontWeight: '500',
                            color: 'white',
                            margin: 0,
                          }}
                        >
                          {location.name}
                        </h4>
                        <p
                          style={{
                            fontSize: '0.875rem',
                            color: '#9ca3af',
                            margin: 0,
                          }}
                        >
                          {location.zipCode} • {location.type}
                        </p>
                      </div>
                      <span
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '0.25rem',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          border: '1px solid',
                          ...getStatusColorInline(location.status),
                        }}
                      >
                        {location.status}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>
                        Stock: {location.stock}
                      </span>
                      {location.expiring > 0 && (
                        <span style={{ fontSize: '0.75rem', color: '#fca5a5' }}>
                          {location.expiring} expiring soon
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div
            style={{
              backgroundColor: '#1f2937',
              borderRadius: '0.5rem',
              border: '1px solid #374151',
            }}
          >
            <div
              style={{ padding: '1.5rem', borderBottom: '1px solid #374151' }}
            >
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  margin: 0,
                }}
              >
                <Activity
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    color: '#86efac',
                    marginRight: '0.5rem',
                  }}
                />
                Recent Requests
              </h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                {currentData.recentRequests.map((request, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#374151',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      border: '1px solid #4b5563',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span style={{ fontWeight: '500', color: 'white' }}>
                        Zip: {request.zipCode}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                          style={{
                            width: '0.5rem',
                            height: '0.5rem',
                            borderRadius: '50%',
                            marginRight: '0.5rem',
                            backgroundColor: getUrgencyColorInline(
                              request.urgency,
                            ),
                          }}
                        ></div>
                        <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                          Level {request.urgency}
                        </span>
                      </div>
                    </div>
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#d1d5db',
                        marginBottom: '0.5rem',
                        margin: '0 0 0.5rem 0',
                      }}
                    >
                      {request.needs.join(', ').replace(/narcan-/g, '')}
                    </p>
                    <p
                      style={{
                        fontSize: '0.75rem',
                        color: '#6b7280',
                        margin: 0,
                      }}
                    >
                      {request.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ask Claude Component */}
        <AskClaudeData currentData={currentData} />

        {/* Footer */}
        <div
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            borderTop: '1px solid #374151',
            paddingTop: '1.5rem',
          }}
        >
          <p style={{ color: '#9ca3af', margin: 0 }}>
            Help, Not Surveillance • Community-Driven Data • Evidence-Based
            Decisions
          </p>
          <p
            style={{
              marginTop: '0.25rem',
              color: '#6b7280',
              margin: '0.25rem 0 0 0',
            }}
          >
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default NarcanDashboard;
