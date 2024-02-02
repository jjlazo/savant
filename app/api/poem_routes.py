from flask import Blueprint, request
from app.models import Author, db, Poem, User, Annotation, Comment
from app.forms import AuthorForm, PoemForm, CommentForm
from flask_login import current_user, login_required

poem_routes = Blueprint('poem', __name__)


@poem_routes.route('')
def get_all_poems():
    poems = Poem.query.all()
    # author_ids = [poem.author_id for poem in poems]
    # authors = [Author.query.get(id) for id in author_ids]
    if poems:
        return {"Poems": [poem.to_dict() for poem in poems]}
    return {'errors': {'message': 'Poems Not Found'}}, 404

# get one by id
@poem_routes.route('/<int:id>')
def get_poem(id):
    poem = Poem.query.get(id)
    if poem:
        return {"Poems": poem.to_dict()}
    return {'errors': {'message': 'Poem Not Found'}}, 404

# create
@poem_routes.route('', methods=["POST"])
@login_required
def create_poem():
    user_id = current_user.id

    form = PoemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        params = {
            "title": form.title.data,
            "body": form.body.data,
            "posted_by": user_id,
            "author_id": form.author_id.data,
            "year_published": form.year_published.data,
            "audio": form.audio.data
        }

        new_poem = Poem(**params)
        db.session.add(new_poem)
        db.session.commit()

        return new_poem.to_dict(), 201

    return form.errors, 400

# update
@poem_routes.route("/<int:id>", methods=["PUT"])
def update_poem(id):
    poem = Poem.query.get(id)

    form = PoemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    author = Author.query.filter(Author.name == form.author.data).first()
    if (poem.posted_by == current_user.id):
        if form.validate_on_submit():
            poem.title = form.title.data
            poem.body = form.body.data
            poem.audio = form.audio.data
            poem.year_published = form.year_published.data
            poem.author_id = author.id

            db.session.commit()

            return poem.to_dict(), 201

        return form.errors, 400

    return { "message": "User unauthorized"}, 401

# delete
@poem_routes.route("/<int:id>", methods=["DELETE"])
def delete_poem(id):
    poem = Poem.query.get(id)

    if (poem.posted_by == current_user.id):
        db.session.delete(poem)
        db.session.commit()

        return {"message": "Success"}, 200

    return { "message": "User unauthorized"}, 401


# Get comment(s) by poem id
@poem_routes.route('/<int:id>/comments')
def get_comments(id):
    comments = Comment.query.filter(Comment.poem_id==id).all()

    return {"Comments": [comment.to_dict() for comment in comments]}


# Create a comment by poem id
@poem_routes.route('/<int:id>/comments', methods=["POST"])
def create_comment(id):
    user_id = current_user.id

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        params = {
            "body": form.body.data,
            "user_id": user_id,
            "poem_id": id
        }

        new_comment = Comment(**params)

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()

    return form.errors, 400
