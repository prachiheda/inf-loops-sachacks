from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..main import generate_startup_report
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class StartupValidationRequest(BaseModel):
    startup_idea: str
    entrepreneur_background: str

@router.post("/validate-startup")
async def validate_startup(request: StartupValidationRequest):
    logger.info(f"Received validation request for startup idea: {request.startup_idea[:50]}...")
    logger.info(f"Entrepreneur background: {request.entrepreneur_background[:50]}...")
    
    try:
        result = generate_startup_report(
            startup_idea=request.startup_idea,
            entrepreneur_background=request.entrepreneur_background
        )
        logger.info("Successfully generated startup report")
        return result
    except Exception as e:
        logger.error(f"Error generating startup report: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e)) 