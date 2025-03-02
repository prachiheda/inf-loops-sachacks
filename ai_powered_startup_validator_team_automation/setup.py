from setuptools import setup, find_packages

setup(
    name="ai_powered_startup_validator_team_automation",
    version="0.1",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    install_requires=[
        "fastapi",
        "uvicorn",
        "python-dotenv",
        # other dependencies...
    ],
) 