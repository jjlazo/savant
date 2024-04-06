from flask import Blueprint, request
from app.models import db, Annotation, User
from app.forms import AnnotationForm
from flask_login import current_user

annotation_routes = Blueprint('annotation', __name__)

@annotation_routes.route('/<int:id>', methods=["PUT"])
def edit_annotation(id):
    annotation = Annotation.query.get(id)
    form = AnnotationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if (annotation.user_id == current_user.id):
        if form.validate_on_submit():
            annotation.note = form.note.data
            annotation.line_number = form.line_number.data
            db.session.commit()

            return annotation.to_dict(), 201

        return form.errors, 400

    return { "message": "User unauthorized"}, 401


@annotation_routes.route("/<int:id>", methods=["DELETE"])
def delete_annotation(id):
    annotation = Annotation.query.get(id)

    if (annotation.user_id == current_user.id):
        db.session.delete(annotation)
        db.session.commit()

        return {"message": "Success"}, 200

    return { "message": "User unauthorized"}, 401


# Create an upvote
@annotation_routes.route("/<int:id>/upvote", methods=["POST"])
def create_upvote(id):
    user = User.query.get(current_user.id)
    note = Annotation.query.get(id)

    if note in user.downvoted_notes:
        user.downvoted_notes.remove(note)
        db.session.commit()

    user.upvoted_notes.append(note)
    db.session.commit()

    return note.to_dict(), 201


# Delete an upvote
@annotation_routes.route("/<int:id>/upvote", methods=["DELETE"])
def delete_upvote(id):
    user = User.query.get(current_user.id)
    note = Annotation.query.get(id)
    if user:
        if note in user.upvoted_notes:
            user.upvoted_notes.remove(note)
            db.session.commit()
            return {"message": "Successfully deleted"}, 201
        return {"message": "Annotation not upvoted"}
    return {"message": "Sign up to upvote annotations!"}


# Create an downvote
@annotation_routes.route("/<int:id>/downvote", methods=["POST"])
def create_downvote(id):
    user = User.query.get(current_user.id)
    note = Annotation.query.get(id)

    if note in user.upvoted_notes:
        user.upvoted_notes.remove(note)
        db.session.commit()

    user.downvoted_notes.append(note)
    db.session.commit()

    return  note.to_dict(), 201


# Delete an downvote
@annotation_routes.route("/<int:id>/downvote", methods=["DELETE"])
def delete_downvote(id):
    user = User.query.get(current_user.id)
    note = Annotation.query.get(id)

    if user:
        if note in user.downvoted_notes:
            user.downvoted_notes.remove(note)
            db.session.commit()
            return {"message": "Successfully deleted"}, 201
        return {"message": "Annotation not downvoted"}
    return {"message": "Sign up to downvote annotations!"}
