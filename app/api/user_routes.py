from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.forms.signup_form import SignUpForm
from app.models import User, db
from app.models.authors import Author
from app.models.poems import Poem
from app.models.annotations import Annotation
from .aws import (
    upload_file_to_s3, get_unique_filename)

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

# update user account
@user_routes.route('<int:id>/account-management', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if user.id == current_user.id:
        if form.validate_on_submit():
            user.username = form.username.data
            user.email = form.email.data
            user.password = form.password.data

            profile_image = form.data["profile picture"]
            profile_image.filename = get_unique_filename(profile_image.filename)
            upload = upload_file_to_s3(profile_image)
            if "url" not in upload:
                return {"message": "Image upload failed"}
            url = upload["url"]
            user.profile_image = url

            db.session.commit()

            return user.to_dict()
        return form.errors, 400
    return { "message": "User unauthorized"}, 401

# delete user account
@user_routes.route('<int:id>/delete-user', methods=['DELETE'])
def delete_account(id):
    user = User.query.get(id)

    if user.id == current_user.id:
        db.session.delete(user)
        db.session.commit()

        return {"message": "Success"}, 200
    return { "message": "User unauthorized"}, 401

# get poems posted by user
@user_routes.route('/<int:id>/user-poems')
def user_poems(id):
    user = User.query.get(id)
    if user.id == current_user.id:
        poems = Poem.query.filter(Poem.posted_by==user.id).all()
        return {"Poems": [poem.to_dict() for poem in poems]}
    return {"message": "User unauthorized"}, 401

# get authors posted by user
@user_routes.route('/<int:id>/user-authors')
def user_authors(id):
    user = User.query.get(id)
    if user.id == current_user.id:
        authors = Author.query.filter(Author.posted_by==user.id).all()
        return {"Authors": [author.to_dict() for author in authors]}
    return {"message": "User unauthorized"}, 401

# get annotations posted by user
@user_routes.route('<int:id>/user-annotations')
def user_annotations(id):
    user = User.query.get(id)
    if user.id == current_user.id:
        annotations = Annotation.query.filter(Annotation.user_id==user.id).all()
        return {"Annotations": [annotation.to_dict() for annotation in annotations]}
    return {"message": "User unauthorized"}, 401
