#!/usr/bin/env python
import sys
import asyncio
import os
from dotenv import load_dotenv
from ai_powered_startup_validator_team_automation.crew import AiPoweredStartupValidatorTeamAutomationCrew
import logging
import json

# Load environment variables
load_dotenv()

# This main file is intended to be a way for your to run your
# crew locally, so refrain from adding unnecessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_startup_report(startup_idea: str, entrepreneur_background: str) -> dict:
    """
    Generate a structured startup validation report based on user inputs.
    """
    # Verify OpenAI API key is set
    if not os.getenv("OPENAI_API_KEY"):
        logger.error("OPENAI_API_KEY environment variable is not set")
        raise ValueError("OpenAI API key is required but not set in environment variables")

    logger.info("Starting startup validation process")
    logger.info(f"Business Idea: {startup_idea[:50]}...")
    logger.info(f"Background: {entrepreneur_background[:50]}...")
    
    try:
        # Create and run the crew with the inputs
        crew = AiPoweredStartupValidatorTeamAutomationCrew()
        logger.info("Created CrewAI instance")
        
        inputs = {
            'business_idea': startup_idea,
            'entrepreneur_background': entrepreneur_background
        }
        
        logger.info("Starting CrewAI analysis...")
        crew_output = crew.crew().kickoff(inputs=inputs)
        logger.info("Raw CrewAI result received")
        
        # Let's first log what we have to understand the structure
        logger.info(f"CrewOutput type: {type(crew_output)}")
        logger.info(f"CrewOutput dir: {dir(crew_output)}")
        
        # Get the last task (AI Validator) output
        if hasattr(crew_output, 'tasks_output') and crew_output.tasks_output:
            # Find the AI Validator task
            for task in crew_output.tasks_output:
                logger.info(f"Task agent: {task.agent if hasattr(task, 'agent') else 'No agent'}")
                logger.info(f"Task attributes: {dir(task)}")
                
                if hasattr(task, 'raw'):
                    # Extract JSON from the raw output
                    raw_str = str(task.raw)
                    json_start = raw_str.find('```json\n')
                    json_end = raw_str.find('\n```', json_start)
                    
                    if json_start != -1 and json_end != -1:
                        json_str = raw_str[json_start + 8:json_end].strip()
                        try:
                            validation_report = json.loads(json_str)
                            logger.info("Successfully parsed validation report")
                            return validation_report
                        except json.JSONDecodeError as e:
                            logger.error(f"Failed to parse JSON: {e}")
                            continue  # Try next task if this one fails
            
            logger.error("Could not find valid JSON in any task output")
            raise ValueError("Missing validation report")
        else:
            logger.error("No tasks output found in CrewOutput")
            raise ValueError("Invalid CrewAI output structure")

    except Exception as e:
        logger.error(f"Error in CrewAI process: {str(e)}")
        raise

def run():
    """
    Run the crew with command line inputs (for testing).
    """
    inputs = {
        'business_idea': 'A compact, solar-powered food dehydrator designed for urban dwellers to reduce food waste by preserving fruits, vegetables, and herbs efficiently at home.',
        'entrepreneur_background': 'Maya Patel, a former sustainability consultant with a passion for zero-waste living, launched SunDry after noticing the lack of affordable, space-saving food preservation solutions. After multiple design iterations, they believe accessible solar dehydration can help households cut food waste by 40%.'
    }

    result = generate_startup_report(
        startup_idea=inputs['business_idea'],
        entrepreneur_background=inputs['entrepreneur_background']
    )
    print(result)

def train():
    """
    Train the crew for a given number of iterations.
    """
    inputs = {
        'business_idea': 'sample_value',
        'entrepreneur_background': 'sample_value'
    }
    try:
        AiPoweredStartupValidatorTeamAutomationCrew().crew().train(n_iterations=int(sys.argv[1]), filename=sys.argv[2], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while training the crew: {e}")

def replay():
    """
    Replay the crew execution from a specific task.
    """
    try:
        AiPoweredStartupValidatorTeamAutomationCrew().crew().replay(task_id=sys.argv[1])

    except Exception as e:
        raise Exception(f"An error occurred while replaying the crew: {e}")

def test():
    """
    Test the crew execution and returns the results.
    """
    inputs = {
        'business_idea': 'sample_value',
        'entrepreneur_background': 'sample_value'
    }
    try:
        AiPoweredStartupValidatorTeamAutomationCrew().crew().test(n_iterations=int(sys.argv[1]), openai_model_name=sys.argv[2], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while testing the crew: {e}")

async def find_similar_founders(business_idea: str, entrepreneur_background: str) -> dict:
    """
    Analyzes the startup and finds similar founders and their experiences.
    """
    crew = AiPoweredStartupValidatorTeamAutomationCrew()
    
    # First validate the startup to ensure we have good context
    validation_result = await crew.validate_and_compile_startup_viability_task().run(
        business_idea=business_idea,
        entrepreneur_background=entrepreneur_background
    )
    
    # Find similar founders based on the validation results
    similar_founders_result = await crew.find_similar_founders_task().run(
        business_idea=business_idea,
        entrepreneur_background=entrepreneur_background
    )
    
    return {
        'validation': validation_result,
        'similar_founders': similar_founders_result
    }

def run_find_similar_founders():
    """
    Run the similar founders finding workflow.
    """
    inputs = {
        'business_idea': 'A subscription service delivering hand-carved, exotic-flavored ice cubes (saffron, truffle, caviar) to high-end cocktail enthusiasts. ',
        'entrepreneur_background': 'RJ Montgomery, a former tax attorney with no F&B experience, launched IceLux after a bartender vaguely approved his idea. Despite shipping issues (ice melts), he insists it is the future of "liquid luxury."'
    }
    
    result = asyncio.run(find_similar_founders(
        business_idea=inputs['business_idea'],
        entrepreneur_background=inputs['entrepreneur_background']
    ))
    
    print("\nValidation Result:")
    print(result['validation'])
    print("\nSimilar Founders Analysis:")
    print(result['similar_founders'])

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: main.py <command> [<args>]")
        print("Commands:")
        print("  run      - Run the main validation workflow")
        print("  find-similar-founders - Find similar founders and their experiences")
        print("  train    - Train the crew")
        print("  replay   - Replay crew execution")
        print("  test     - Test the crew")
        sys.exit(1)

    command = sys.argv[1]
    if command == "run":
        run()
    elif command == "find-similar-founders":
        run_find_similar_founders()
    elif command == "train":
        train()
    elif command == "replay":
        replay()
    elif command == "test":
        test()
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)
