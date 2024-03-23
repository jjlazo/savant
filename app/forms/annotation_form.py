from flask_wtf import FlaskForm
from wtforms import SubmitField, TextAreaField
from wtforms.validators import DataRequired, Length

class AnnotationForm(FlaskForm):
    note = TextAreaField('Annotation', validators=[DataRequired(), Length(min=4,max=200, message="Annotation must be between 4 and 200 characters.")])
    submit = SubmitField('Submit')
