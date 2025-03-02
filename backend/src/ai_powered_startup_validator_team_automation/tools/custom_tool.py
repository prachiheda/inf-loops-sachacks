from crewai.tools import BaseTool
from typing import Type, Optional
from pydantic import BaseModel, Field

class SimilarFounderSearchInput(BaseModel):
    """Input schema for SimilarFounderTool."""
    business_idea: str = Field(..., description="The startup idea to find similar founders/companies for")
    background: str = Field(..., description="The entrepreneur's background and experience")
    industry: Optional[str] = Field(None, description="Specific industry to focus on")

class SimilarFounderTool(BaseTool):
    name: str = "similar_founder_search"
    description: str = (
        "Research tool to find real entrepreneurs and companies with similar backgrounds or business models. "
        "Searches through business news, LinkedIn profiles, startup directories, and industry publications "
        "to identify relevant case studies and success stories. Analyzes patterns in career transitions, "
        "industry pivots, and startup journeys."
    )
    args_schema: Type[BaseModel] = SimilarFounderSearchInput

    def _run(self, business_idea: str, background: str, industry: Optional[str] = None) -> str:
        """
        The agent using this tool will:
        1. Search for relevant founders using the WebsiteSearchTool
        2. Analyze their profiles and companies using the ScrapeWebsiteTool
        3. Compile insights about similar journeys and transitions
        
        This tool provides the framework for the agent to structure their research
        and compile findings in a useful format.
        """
        research_template = {
            "search_queries": [
                f"founders who transitioned from {background} to startups",
                f"successful {industry} startups similar to {business_idea}",
                f"entrepreneur success stories {industry} subscription service",
                "career change success stories entrepreneurship",
                f"startup founders with {background} background"
            ],
            "analysis_points": [
                "Look for founders with similar professional backgrounds",
                "Identify companies with similar business models",
                "Find success stories of career transitions",
                "Analyze common challenges and solutions",
                "Look for mentorship opportunities and networking connections"
            ],
            "output_format": {
                "similar_founders": [
                    "Name and current company",
                    "Previous background/experience",
                    "Key challenges overcome",
                    "Success factors and insights",
                    "Current status and achievements"
                ],
                "pattern_analysis": [
                    "Common transition strategies",
                    "Frequently cited challenges",
                    "Success patterns",
                    "Industry-specific insights",
                    "Recommended networking approaches"
                ]
            }
        }
        
        return str(research_template)
