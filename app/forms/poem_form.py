from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField,  URLField, SubmitField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Author

class PoemForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    author_id = IntegerField('Author', validators=[DataRequired()])
    body = TextAreaField('Body', validators=[DataRequired()])
    audio = StringField('Audio Recording')
    year_published = IntegerField('Year of Publication', validators=[DataRequired()])
    submit = SubmitField('Submit')
