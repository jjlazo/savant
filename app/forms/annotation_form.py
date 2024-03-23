from flask_wtf import FlaskForm
from wtforms import SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length

class AnnotationForm(FlaskForm):
    line_number = IntegerField('Line Number', validators=[DataRequired()])
    note = TextAreaField('Annotation', validators=[DataRequired(), Length(min=4,max=200, message="Annotation must be between 4 and 200 characters.")])
    submit = SubmitField('Submit')
