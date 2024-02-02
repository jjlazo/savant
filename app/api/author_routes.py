from flask import Blueprint, request
from app.models import Author, db
from app.forms import AuthorForm
from flask_login import current_user, login_required

author_routes = Blueprint('author', __name__)

# get all
@author_routes.route('')
def get_all_authors():
    authors = Author.query.all()
    if authors:
        return {"Authors": [author.to_dict() for author in authors]}
    return {'errors': {'message': 'Authors Not Found'}}, 404

# get one by id
@author_routes.route('/<int:id>')
def get_author(id):
    author = Author.query.get(id)
    if author:
        return {"Authors": author.to_dict()}
    return {'errors': {'message': 'Author Not Found'}}, 404

# create
@author_routes.route('', methods=["POST"])
def create_author():
    user_id = current_user.id

    form = AuthorForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        params = {
            "name": form.name.data,
            "biography": form.biography.data,
            "posted_by": user_id
        }

        new_author = Author(**params)
        db.session.add(new_author)
        db.session.commit()

        return new_author.to_dict(), 201

    return form.errors, 400

# update
@author_routes.route("/<int:id>", methods=["PUT"])
def update_author(id):
    author = Author.query.get(id)

    form = AuthorForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if (author.posted_by == current_user.id):
        if form.validate_on_submit():
            author.name = form.name.data
            author.biography = form.biography.data

            db.session.commit()

            return author.to_dict(), 201

        return form.errors, 400

    return { "message": "User unauthorized"}, 401

# delete
@author_routes.route("/<int:id>", methods=["DELETE"])
def delete_author(id):
    author = Author.query.get(id)

    if (author.posted_by == current_user.id):
        db.session.delete(author)
        db.session.commit()

        return {"message": "Success"}, 200

    return { "message": "User unauthorized"}, 401

# get all poems of an author
@author_routes.route('/<int:id>/poems')
def get_poems_by_author(id):
    author = Author.query.get(id)
    if author:
        return {"Poems": [poem.to_dict() for poem in author.poems]}
    return {'errors': {'message': 'Poems Not Found'}}, 404
