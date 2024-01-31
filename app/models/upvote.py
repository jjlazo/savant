from .db import db, environment, SCHEMA, add_prefix_for_prod

upvotes = db.Table(
    "upvotes",
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
    upvotes.schema = SCHEMA
