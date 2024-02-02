from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# get user bookmarks
@user_routes.route('/<int:id>/bookmarks')
def user_bookmarks(id):
    user = User.query.get(id)
    if user.id == current_user.id:
        return {"Bookmarks": [poem.to_dict() for poem in user.bookmarks]}
    return { "message": "User unauthorized"}, 401
