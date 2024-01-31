from flask import Blueprint, request
from app.models import Author, db, Poem, User, Annotation
from app.forms import AuthorForm, PoemForm
from flask_login import current_user, login_required

poem_routes = Blueprint('poem', __name__)


@poem_routes.route('/')
def get_all_poems():
    poems = Poem.query.all()
    if poems:
        return {"Poems": [poem.to_dict() for poem in poems]}
    return {'errors': {'message': 'Poems Not Found'}}, 404
