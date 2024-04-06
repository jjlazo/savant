from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Annotation(db.Model):
    __tablename__ = 'annotations'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    line_number = db.Column(db.Integer, nullable=False)
    note = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    poem_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('poems.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship("User", back_populates="annotations")
    poem = db.relationship("Poem", back_populates="annotations")
    upvotes = db.relationship("User", secondary="upvotes", back_populates="upvoted_notes")
    downvotes = db.relationship("User", secondary="downvotes", back_populates="downvoted_notes")

    def to_dict(self):
        return {
            'id': self.id,
            'note': self.note,
            'user_id': self.user_id,
            'poem_id': self.poem_id,
            "line_number": self.line_number,
            "username": self.user.username,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            'upvotes': [vote.id for vote in self.upvotes],
            'downvotes': [vote.id for vote in self.downvotes]
        }
