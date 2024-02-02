from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField, IntegerField,  URLField, SubmitField, TextAreaField, SelectField
from wtforms.validators import DataRequired, ValidationError
from app.models import Author

# auth_names = [author.name for author in Author.query.all()]
# AUTHOR_CHOICES = auth_names.append("Not Listed")

# def choice_dne(form, field):
#     # prompt user to create author if their choice does not exist
#     choice = field.data

#     if choice == "Not Listed":
#         raise ValidationError('Author not listed. Would you like to create an Author?')

class PoemForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    # author = SelectField('Author', validators=[DataRequired(), choice_dne], choices=AUTHOR_CHOICES)
    author_id = IntegerField('Author', validators=[DataRequired()])
    body = TextAreaField('Body', validators=[DataRequired()])
    audio = URLField('Audio Recording')
    year_published = IntegerField('Year of Publication', validators=[DataRequired()])
    submit = SubmitField('Submit')
