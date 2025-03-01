#!/usr/bin/env python
import sys
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
        'business_idea': 'A subscription service delivering hand-carved, exotic-flavored ice cubes (saffron, truffle, caviar) to high-end cocktail enthusiasts. ',
        'entrepreneur_background': 'RJ Montgomery, a former tax attorney with no F&B experience, launched IceLux after a bartender vaguely approved his idea. Despite shipping issues (ice melts), he insists it is the future of “liquid luxury.'
    }


    AiPoweredStartupValidatorTeamAutomationCrew().crew().kickoff(inputs=inputs)
    print(AiPoweredStartupValidatorTeamAutomationCrew().get_startup_viability_score()); 


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

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: main.py <command> [<args>]")
        sys.exit(1)

    command = sys.argv[1]
    if command == "run":
        run()
    elif command == "train":
        train()
    elif command == "replay":
        replay()
    elif command == "test":
        test()
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)
