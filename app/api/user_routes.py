from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import User
from app.models.authors import Author
from app.models.poems import Poem
from app.models.annotations import Annotation

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
        return {"Poems": [poem.to_dict() for poem in user.bookmarks]}
    return { "message": "User unauthorized"}, 401

@user_routes.route('/<int:id>/user-poems')
def user_poems(id):
    user = User.query.get(id)
    if user.id == current_user.id:
        poems = Poem.query.filter(Poem.posted_by==user.id).all()
        return {"Poems": [poem.to_dict() for poem in poems]}
    return {"message": "User unauthorized"}, 401

@user_routes.route('/<int:id>/user-authors')
def user_authors(id):
    user = User.query.get(id)
    if user.id == current_user.id:
        authors = Author.query.filter(Author.posted_by==user.id).all()
        return {"Authors": [author.to_dict() for author in authors]}
    return {"message": "User unauthorized"}, 401

@user_routes.route('<int:id>/user-annotations')
def user_annotations(id):
    user = User.query.get(id)
    if user.id == current_user.id:
        annotations = Annotation.query.filter(Annotation.user_id==user.id).all()
        return {"Annotations": [annotation.to_dict() for annotation in annotations]}
    return {"message": "User unauthorized"}, 401
