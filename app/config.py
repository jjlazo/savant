import os
# from .api.poem_routes import change_potd
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    FLASK_RUN_PORT = os.environ.get('FLASK_RUN_PORT')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
    SCHEDULER_JOBSTORES = {
        "default": SQLAlchemyJobStore(url="sqlite:///dev.db")
    }
    # JOBS = [
    #     {
    #         "id": "job1",
    #         "func": change_potd,
    #         "trigger": "cron",
    #         "hour": 0,
    #     }
    # ]
    SCHEDULER_API_ENABLED = True
