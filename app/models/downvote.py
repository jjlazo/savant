from .db import db, environment, SCHEMA, add_prefix_for_prod

downvotes = db.Table(
    "downvotes",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
    ),
    db.Column(
        "annotation_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('annotations.id')),
        primary_key=True
    )
)
if environment == "production":
    downvotes.schema = SCHEMA
