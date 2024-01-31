from flask import Blueprint, request
from app.models import Author, db, Poem, User, Annotation, Comment
from app.forms import CommentForm
from flask_login import current_user, login_required

comment_routes = Blueprint('comment', __name__)

@comment_routes.route('/poems/<int:id>', methods=["PUT"])
def edit_comment(id):
    comment = Comment.query.get(id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if (comment.user_id == current_user.id):
        if form.validate_on_submit():
            comment.body = form.body.data
            db.session.commit()

            return comment.to_dict(), 201

        return form.errors, 400

    return { "message": "User unauthorized"}, 401
