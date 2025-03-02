#!/usr/bin/env python
import sys
import asyncio
from ai_powered_startup_validator_team_automation.crew import AiPoweredStartupValidatorTeamAutomationCrew

# This main file is intended to be a way for your to run your
# crew locally, so refrain from adding unnecessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information

def run():
    """
    Run the crew.
    """
    inputs = {
    'business_idea': 'A compact, solar-powered food dehydrator designed for urban dwellers to reduce food waste by preserving fruits, vegetables, and herbs efficiently at home.',
    'entrepreneur_background': 'Maya Patel, a former sustainability consultant with a passion for zero-waste living, launched SunDry after noticing the lack of affordable, space-saving food preservation solutions. After multiple design iterations, they believe accessible solar dehydration can help households cut food waste by 40%.'
}




    AiPoweredStartupValidatorTeamAutomationCrew().crew().kickoff(inputs=inputs)


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
        print("  run                  - Run the main validation workflow")
        print("  find-similar-founders - Find similar founders and their experiences")
        print("  train                - Train the crew")
        print("  replay               - Replay crew execution")
        print("  test                 - Test the crew")
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
