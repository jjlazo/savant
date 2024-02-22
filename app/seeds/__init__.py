from flask.cli import AppGroup

from app.seeds.poems import seed_poems, undo_poems
from .users import seed_users, undo_users
from .authors import seed_authors, undo_authors
from .comments import seed_comments, undo_comments

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_comments()
        undo_poems()
        undo_authors()
        undo_users()
    seed_users()
    seed_authors()
    seed_poems()
    seed_comments()
    # seed_annotations()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # undo_annotations()
    undo_comments()
    undo_poems()
    undo_authors()
    undo_users()
    # Add other undo functions here
