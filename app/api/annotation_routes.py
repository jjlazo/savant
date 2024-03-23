from flask import Blueprint, request
from app.models import db, Annotation
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
