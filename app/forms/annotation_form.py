from flask_wtf import FlaskForm
from wtforms import SubmitField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Annotation

def max_notes(form, field):
    # max 5 annotations per line
    line_number = field.data
    annotations = Annotation.query.filter(Annotation.line_number==line_number).all()
    if len(annotations) >= 5:
        raise ValidationError('Only five annotations per line allowed.')

class AnnotationForm(FlaskForm):
    line_number = IntegerField('Line Number', validators=[DataRequired()])
    note = TextAreaField('Annotation', validators=[DataRequired(), Length(min=4,max=200, message="Annotation must be between 4 and 200 characters.")])
    submit = SubmitField('Submit')
