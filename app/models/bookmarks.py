from .db import db, environment, SCHEMA, add_prefix_for_prod

bookmarks = db.Table(
    "bookmarks",
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        primary_key=True
    ),
    db.Column(
        "poem_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('poems.id')),
        primary_key=True
    )
)
if environment == "production":
    bookmarks.schema = SCHEMA
