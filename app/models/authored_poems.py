# from .db import db, environment, SCHEMA, add_prefix_for_prod

# authored_poems = db.Table(
#     "authored_poems",
#     db.Column(
#         "author_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod('authors.id')),
#         primary_key=True
#     ),
#     db.Column(
#         "poem_id",
#         db.Integer,
#         db.ForeignKey(add_prefix_for_prod('poems.id')),
#         primary_key=True
#     )
# )
# if environment == "production":
#     authored_poems.schema = SCHEMA
