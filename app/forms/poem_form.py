from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length

class PoemForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    author_id = IntegerField('Author', validators=[DataRequired()])
    body = TextAreaField('Body', validators=[DataRequired(), Length(min=4,max=2000, message="Body must be between 4 and 2000 characters.")])
    audio = StringField('Audio Recording')
    year_published = IntegerField('Year of Publication', validators=[DataRequired()])
    submit = SubmitField('Submit')
