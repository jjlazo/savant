from app.models import db, Annotation, environment, SCHEMA
from sqlalchemy.sql import text


def seed_annotations():
    note1 = Annotation(
        line_number=1, user_id=3, poem_id=9, note="Based on contextual clues in the surrounding poems, most scholars assume that the person addressed in this sonnet is a young man, possibly of higher social standing than the poet. Despite extensive analysis, there is no consensus about who this young man was.")
    # note2 = Annotation(
    #     line_number=1, user_id=2, poem_id=1, note="")
    # note3 = Annotation(
    #     line_number=1, user_id=3, poem_id=2, note="")
    # note4 = Annotation(
    #     line_number=1, user_id=4, poem_id=2, note="")
    # note5 = Annotation(
    #     line_number=1, user_id=5, poem_id=3, note="")
    # note6 = Annotation(
    #     line_number=1, user_id=6, poem_id=3, note="")
    # note7 = Annotation(
    #     line_number=1, user_id=4, poem_id=4, note="")
    # note8 = Annotation(
    #     line_number=1, user_id=3, poem_id=4, note="")
    # note9 = Annotation(
    #     line_number=1, user_id=2, poem_id=4, note="")
    # note10 = Annotation(
    #     line_number=1, user_id=6, poem_id=5, note="")
    # note11 = Annotation(
    #     line_number=1, user_id=1, poem_id=5, note="")
    # note12 = Annotation(
    #     line_number=1, user_id=4, poem_id=6, note="")
    # note13 = Annotation(
    #     line_number=1, user_id=5, poem_id=6, note="")
    # note14 = Annotation(
    #     line_number=1, user_id=2, poem_id=7, note="")
    # note15 = Annotation(
    #     line_number=1, user_id=6, poem_id=7, note="")
    # note16 = Annotation(
    #     line_number=1, user_id=5, poem_id=8, note="")
    # note17 = Annotation(
    #     line_number=1, user_id=6, poem_id=8, note="")
    # note18 = Annotation(
    #     line_number=1, user_id=3, poem_id=9, note="")
    # note19 = Annotation(
    #     line_number=1, user_id=2, poem_id=9, note="")

    db.session.add(note1)
    # db.session.add(note2)
    # db.session.add(note3)
    # db.session.add(note4)
    # db.session.add(note5)
    # db.session.add(note6)
    # db.session.add(note7)
    # db.session.add(note8)
    # db.session.add(note9)
    # db.session.add(note10)
    # db.session.add(note11)
    # db.session.add(note12)
    # db.session.add(note13)
    # db.session.add(note14)
    # db.session.add(note15)
    # db.session.add(note16)
    # db.session.add(note17)
    # db.session.add(note18)
    # db.session.add(note19)
    db.session.commit()


def undo_annotations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.annotations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM annotations"))

    db.session.commit()
