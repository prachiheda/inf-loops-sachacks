# InnovaAI: AI-powered Startup Validation

## Inspiration

As aspiring entrepreneurs, our team has plenty of ideas—but turning them into reality has always felt like a guessing game. The path from concept to execution is full of challenges: validating market demand, refining ideas, and figuring out the next steps. Many founders struggle with uncertainty, fear of failure, and a lack of guidance.

What if we could change that? Our **AI-driven agents** take the guesswork out of early-stage validation, analyzing market potential, assessing feasibility, and providing actionable insights in real time. It’s not just a tool—it’s like having a strategic co-founder that helps you move forward with clarity and confidence. The future of entrepreneurship isn’t about waiting for the perfect moment—it’s about taking action with the right data at your fingertips.

---

## What it does

Our system is built on a **multi-agent AI framework** designed to **validate and refine startup ideas**, helping founders navigate the early stages of entrepreneurship with data-driven insights. Using **Crew AI**, we’ve assembled a specialized team of agents, each playing a key role in the validation process.

### How It Works

- 🔍 **Market Researcher** – Analyzes industry trends, competitor landscapes, and market gaps through web searches and data scraping. This agent helps identify opportunities and potential challenges by synthesizing real-time market intelligence.
- 📊 **Business Analyst** – Evaluates the feasibility of an idea by assessing its business model, scalability, and risks. Drawing from case studies and structured frameworks, this agent provides a **viability score** based on factors like market demand, competition, and operational complexity.
- 💰 **Financial Forecaster** – Generates revenue projections, cost estimates, and break-even analyses by integrating market insights and financial benchmarks. This agent ensures entrepreneurs have a realistic financial outlook for their startup.
- 🤖 **AI Validator** – Aggregates insights from all agents to create a comprehensive **startup validation report**, complete with viability scoring and actionable recommendations. Users can adjust weightings to prioritize aspects like market trends, competition, or financial sustainability.

### From Idea to Execution

Once validation is complete, **automation agents** assist with next steps, such as refining business models and strategizing investor outreach. By removing uncertainty and streamlining decision-making, our system empowers founders to move forward with clarity, speed, and confidence—turning ideas into fundable, market-ready ventures.

---

## How to Run the Project

### Frontend Setup

1. **Navigate to the frontend folder:**
   ```bash
   cd frontend
   ```
2. **Install the Dependencies:**

   ```bash
   npm install
   ```

5. **Run the frontend development server:**

   ```bash
   npm run dev
   ```

### Backend Setup

1. **Open a new terminal and navigate to the backend folder:**
   ```bash
   cd backend
   ```
2. **Create a virtual environment (if not already created):**

    ```bash
    python3 -m venv venv
    ```

3. **Activate the virtual environment:**

   On macOS/Linux:

   ```bash
   source venv/bin/activate
   ```

   On Windows:

   ```bash
   .\venv\Scripts\activate
   ```

4. **Install required dependencies:**
   ```bash
   pip install 'crewai[tools]'
   ```
5. **Run the server with Uvicorn:**
   ```bash
   uvicorn ai_powered_startup_validator_team_automation.app:app --reload --port 8000
   ```
