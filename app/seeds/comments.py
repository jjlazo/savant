from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


def seed_comments():
    com1 = Comment(
        body='one of my all time favorites!', user_id=1, poem_id=1)
    com2 = Comment(
        body='I think of this piece often!', user_id=2, poem_id=1)
    com3 = Comment(
        body='Bookmarking this to read again later!', user_id=3, poem_id=2)
    com4 = Comment(
        body='So great to find a copy of this online, if only I could find my compilation!', user_id=4, poem_id=2)
    com5 = Comment(
        body='This is such a great read, adding it to my bookmarks now!', user_id=5, poem_id=3)
    com6 = Comment(
        body='10/10', user_id=6, poem_id=3)
    com7 = Comment(
        body='Bookmarking this!!', user_id=4, poem_id=4)
    com8 = Comment(
        body='So great to find this!', user_id=3, poem_id=4)
    com9 = Comment(
        body='This is such a great poem, thanks for sharing it!', user_id=2, poem_id=4)
    com10 = Comment(
        body='Wow! Breathtaking!', user_id=6, poem_id=5)
    com11 = Comment(
        body='Bookmarking!', user_id=1, poem_id=5)
    com12 = Comment(
        body='So glad this was added to the collection!', user_id=4, poem_id=6)
    com13 = Comment(
        body='I wonder if there are any other works by this author?', user_id=5, poem_id=6)
    com14 = Comment(
        body='100/10', user_id=2, poem_id=7)
    com15 = Comment(
        body='Reading is FUNdamental! love these fun poems!', user_id=6, poem_id=7)
    com16 = Comment(
        body='This is such a classic, adding it to my bookmarks.', user_id=5, poem_id=8)
    com17 = Comment(
        body='I adore this fragment', user_id=6, poem_id=8)
    com18 = Comment(
        body='This is my favorite sonnet!', user_id=3, poem_id=9)
    com19 = Comment(
        body='Thank you so much for sharing!', user_id=2, poem_id=9)

    db.session.add(com1)
    db.session.add(com2)
    db.session.add(com3)
    db.session.add(com4)
    db.session.add(com5)
    db.session.add(com6)
    db.session.add(com7)
    db.session.add(com8)
    db.session.add(com9)
    db.session.add(com10)
    db.session.add(com11)
    db.session.add(com12)
    db.session.add(com13)
    db.session.add(com14)
    db.session.add(com15)
    db.session.add(com16)
    db.session.add(com17)
    db.session.add(com18)
    db.session.add(com19)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
