from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import WebsiteSearchTool
from crewai_tools import PDFSearchTool
from crewai_tools import ScrapeWebsiteTool


@CrewBase
class AiPoweredStartupValidatorTeamAutomationCrew():
    """AiPoweredStartupValidatorTeamAutomation crew"""

    def __init__(self):
        super().__init__()
        # Initialize tools that will be reused
        self.scrape_tool = ScrapeWebsiteTool()  # Allow scraping any website it finds
        self.search_tool = WebsiteSearchTool()  # For searching across websites

    @agent
    def business_analyst(self) -> Agent:
        return Agent(
            config=self.agents_config['business_analyst'],
            tools=[WebsiteSearchTool(), PDFSearchTool()],
        )

    @agent
    def market_researcher(self) -> Agent:
        return Agent(
            config=self.agents_config['market_researcher'],
            tools=[
                self.scrape_tool,
                self.search_tool
            ],
        )

    @agent
    def financial_forecaster(self) -> Agent:
        return Agent(
            config=self.agents_config['financial_forecaster'],
            tools=[],
        )

    @agent
    def ai_validator(self) -> Agent:
        return Agent(
            config=self.agents_config['ai_validator'],
            tools=[],
        )


    @task
    def analyze_business_idea_task(self) -> Task:
        return Task(
            config=self.tasks_config['analyze_business_idea_task'],
            tools=[],
        )

    @task
    def conduct_market_research_task(self) -> Task:
        return Task(
            config=self.tasks_config['conduct_market_research_task'],
            tools=[],
        )

    @task
    def generate_financial_projections_task(self) -> Task:
        return Task(
            config=self.tasks_config['generate_financial_projections_task'],
            tools=[],
        )

    @task
    def validate_and_compile_startup_viability_task(self) -> Task:
        """
        Validates and compiles startup viability, returning both the report and score.
        """
        return Task(
            config=self.tasks_config['validate_and_compile_startup_viability_task'],
            tools=[],
        )


    @crew
    def crew(self) -> Crew:
        """Creates the AiPoweredStartupValidatorTeamAutomation crew"""
        return Crew(
            agents=self.agents, # Automatically created by the @agent decorator
            tasks=self.tasks, # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
        )
