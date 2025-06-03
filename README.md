# Narcan Connect

_Building America's Edge in Health Innovation_

**Help, Not Surveillance.** A community-driven platform that gets Narcan (naloxone) where it's needed while giving public health leaders the data they need to save lives.

## 🚨 The Problem

In rural West Virginia, [ambulance response times can be 50 minutes or more](https://wvpublic.org/w-va-lawmakers-learn-of-challenges-facing-ems-squads/). [Narcan must be given as quickly as possible during an overdose](https://www.cdc.gov/overdose-prevention/media/pdfs/2024/04/Naloxone-Fact-Sheet_FamilyandCaregivers_HowandWhen_4_11_2024.pdf) - [access to naloxone can save a life](https://www.fda.gov/consumers/consumer-updates/access-naloxone-can-save-life-during-opioid-overdose). But leaders lack real-time data to make smart resource allocation decisions and get help where it is needed the most.

## 🎯 The Solution

[West Virginia has one of the highest overdose rates in the nation, but deaths are declining thanks to community outreach efforts](https://wvmetronews.com/2025/05/16/west-virginias-overdose-deaths-plummeted-by-43-5-last-year-according-to-early-data/#:~:text=West%20Virginia%20has%20had%20the,a%20year%20in%20West%20Virginia.) - our platform supports this outreach and makes it sustainable through better data and coordination:

- **Neighbor Connect** - Provides community resources for Narcan access/training while generating insights into local needs
- **Provider Connect** - Enables collaborative stock tracking for distribution centers while building a real-time resource network
- **Data Connect** - Creates a single pane of glass for leaders with on-demand AI analysis to better respond to community needs

## 🤖 AI Integration

The Data Connect dashboard uses Claude for on-demand data analysis:

- "How many overdose deaths this week?"
- "Which areas have highest urgency requests?"
- "What locations are running low on stock?"

As data grows, Claude's insights become more powerful for resource allocation and intervention strategies.

## 🛠️ Tech Stack

**Frontend:** React, Docusaurus, JavaScript (intentionally simple for rural accessibility)
**Integration:** Express.js server, Claude API
**Philosophy:** Low-tech approach works on older devices and limited internet

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file with your Anthropic API key
echo "CLAUDE_API_KEY=your_api_key_here" > .env

# Start the documentation site
npm run start

# Run the Express server (separate terminal)
node server.js
```

## 🏆 Hackathon Impact

- ✅ Empowers public health officials with on-demand data analysis
- ✅ Aligns with [West Virginia's community-based Narcan distribution policy since 2021](https://dhhr.wv.gov/office-of-drug-control-policy/news/Documents/2020%20ED%20Naloxone%20Toolkit/Standing%20Order%20for%20Naloxone%20Eligible%20Receipent%20Organizations%2008.10.2021%20-%20FINAL.pdf)
- ✅ Creates sustainable community trust through "help not surveillance"
- ✅ Scalable to any rural county facing similar challenges

## 📊 Why This Matters

**The Gap:** Rural health leaders operate in a "data drought" while communities distrust surveillance systems.

**Our Bridge:** Simple, anonymous community participation builds trust while creating the data infrastructure leaders need, powered by AI analysis for smarter Narcan distribution.

**The Result:** More Narcan in community hands, better resource allocation, lives saved.

## 🔮 Next Steps

- Mobile-first forms for offline capability and broader rural access
- Enhanced web dashboard with predictive analytics
- Integration with state health databases via Model Context Protocols
- Multi-county rollout across West Virginia
- Expansion to other rural states facing similar challenges

---
