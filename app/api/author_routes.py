from flask import Blueprint, request
from app.models import Author, db
from app.forms import AuthorForm
from flask_login import current_user, login_required

author_routes = Blueprint('author', __name__)


@author_routes.route('/')
def get_all_authors():
    authors = Author.query.all()
    if authors:
        return {"Authors": [author.to_dict() for author in authors]}
    return {'errors': {'message': 'Authors Not Found'}}, 404
