from .db import db, environment, SCHEMA, add_prefix_for_prod


class Poem(db.Model):
    __tablename__ = 'poems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('authors.id')), nullable=False)
    body = db.Column(db.String, nullable=False)
    audio = db.Column(db.String)
    year_published = db.Column(db.Integer, nullable=False)
    posted_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    potd = db.Column(db.Boolean, default=False)

    author = db.relationship("Author", back_populates="poems")
    comments = db.relationship("Comment", back_populates="poem", cascade="all,delete")
    bookmarked_by = db.relationship("User", secondary="bookmarks", back_populates="bookmarks")
    annotations = db.relationship("Annotation", back_populates="poem")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'posted_by': self.posted_by,
            'year_published': self.year_published,
            'potd': self.potd,
            'audio': self.audio,
            'author_id': self.author_id,
            'author': self.author.name,
            'annotations': [note.id for note in self.annotations],
            # 'bookmarked_by': [user.id for user in self.bookmarked_by],
            # 'comments': [comment for comment in self.comments]
        }
