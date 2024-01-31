from .db import db, environment, SCHEMA, add_prefix_for_prod


class Author(db.Model):
    __tablename__ = 'authors'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    biography = db.Column(db.String(2000), nullable=False)
    posted_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    poems = db.relationship("Poem", secondary="authored_poems", back_populates="author")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'biography': self.biography,
            'posted_by': self.posted_by,
            'poems': [poem for poem in self.poems]
        }
