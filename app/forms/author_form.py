from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField,  URLField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Author

def author_exists(form, field):
    # Checking if author exists
    name = field.data
    author = Author.query.filter(Author.name == name).first()
    if author:
        raise ValidationError('Author already exists.')


class AuthorForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), author_exists])
    biography = StringField('Biography', validators=[DataRequired()])
    submit = SubmitField('Submit')
