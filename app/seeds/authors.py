from app.models import db, Author, environment, SCHEMA
from sqlalchemy.sql import text

def seed_authors():
    shakespeare = Author(
        name='William Shakespeare', biography='William Shakespeare was an English playwright, poet and actor. He is widely regarded as the greatest writer in the English language and the world\'s pre-eminent dramatist. He is often called England\'s national poet and the "Bard of Avon".', posted_by=1)
    yeats = Author(
        name='William Butler Yeats', biography='William Butler Yeats was an Irish poet, dramatist and writer, and one of the foremost figures of 20th-century literature. He was a driving force behind the Irish Literary Revival, and along with Lady Gregory founded the Abbey Theatre, serving as its chief during its early years.', posted_by=1)
    dickinson = Author(
        name='Emily Dickinson', biography='Emily Elizabeth Dickinson was an American poet. Little-known during her life, she has since been regarded as one of the most important figures in American poetry. Dickinson was born in Amherst, Massachusetts, into a prominent family with strong ties to its community.', posted_by=2)
    whitman = Author(
        name='Walt Whitman', biography='Walter Whitman Jr. was an American poet, essayist, and journalist. He is considered one of the most influential poets in American literature. Whitman incorporated both transcendentalism and realism in his writings and is often called the father of free verse.', posted_by=2)
    blake = Author(
        name='William Blake', biography='William Blake was an English poet, painter, and printmaker. Largely unrecognised during his life, Blake is now considered a seminal figure in the history of the poetry and visual art of the Romantic Age.', posted_by=3)
    browning = Author(
        name='Elizabeth Barrett Browning', biography='Elizabeth Barrett Browning was an English poet of the Victorian era, popular in Britain and the United States during her lifetime and frequently anthologised after her death.', posted_by=3)
    cummings = Author(
        name='ee cummings', biography='Edward Estlin Cummings, who was also known as E. E. Cummings, e. e. Cummings, and e e Cummings, was an American poet, painter, essayist, author, and playwright. He was an ambulance driver during World War I and was in an internment camp, which provided the basis for his novel The Enormous Room.', posted_by=4)
    shelley = Author(
        name='Percy Bysshe Shelley', biography='Percy Bysshe Shelley was a British writer who is considered one of the major English Romantic poets.', posted_by=4)
    oliver = Author(
        name='Mary Oliver', biography='Mary Jane Oliver was an American poet who won the National Book Award and the Pulitzer Prize. She found inspiration for her work in nature and had a lifelong habit of solitary walks in the wild.', posted_by=4)

    db.session.add(shakespeare)
    db.session.add(yeats)
    db.session.add(dickinson)
    db.session.add(whitman)
    db.session.add(blake)
    db.session.add(browning)
    db.session.add(cummings)
    db.session.add(shelley)
    db.session.add(oliver)
    db.session.commit()


def undo_authors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.authors RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM authors"))

    db.session.commit()
