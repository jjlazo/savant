from app.models import db, Poem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_poems():
    shakespeare = Poem(
        title='Sonnet 55', body='No longer mourn for me when I am dead \n Then you shall hear the surly sullen bell\n Give warning to the world that I am fled\n From this vile world, with vilest worms to dwell:\n Nay, if you read this line, remember not\n The hand that writ it; for I love you so\n That I in your sweet thoughts would be forgot\n If thinking on me then should make you woe.\n O, if, I say, you look upon this verse\n When I perhaps compounded am with clay,\n Do not so much as my poor name rehearse.\n But let your love even with my life decay,\n Lest the wise world should look into your moan\n And mock you with me after I am gone', posted_by=1, author_id=1, year_published=1609, audio="none")
    yeats = Poem(
        title='The Second Coming', body='Turning and turning in the widening gyre \n The falcon cannot hear the falconer; \n Things fall apart; the centre cannot hold; \n Mere anarchy is loosed upon the world, \n The blood-dimmed tide is loosed, and everywhere \n The ceremony of innocence is drowned; \n The best lack all conviction, while the worst \n Are full of passionate intensity. \n Surely some revelation is at hand; \n Surely the Second Coming is at hand. \n The Second Coming! Hardly are those words out \n When a vast image out of Spiritus Mundi \n Troubles my sight: somewhere in sands of the desert \n A shape with lion body and the head of a man, \n A gaze blank and pitiless as the sun, \n Is moving its slow thighs, while all about it \n Reel shadows of the indignant desert birds. \n The darkness drops again; but now I know \n That twenty centuries of stony sleep \n Were vexed to nightmare by a rocking cradle, \n And what rough beast, its hour come round at last, \n Slouches towards Bethlehem to be born?', posted_by=1, author_id=2, year_published=1920, audio="none")
    dickinson = Poem(
        title='Because I could not stop for Death', body='Because I could not stop for Death -- \n He kindly stopped for me -- \n The Carriage held but just Ourselves -- \n And Immortality. \n We slowly drove -- He knew no haste \n And I had put away \n My labor and my leisure too, \n For His Civility -- \n We passed the School, where Children strove \n At Recess -- in the Ring -- \n We passed the Fields of Gazing Grain -- \n We passed the Setting Sun -- \n Or rather -- He passed Us -- \n The Dews drew quivering and Chill -- \n For only Gossamer, my Gown -- \n My Tippet -- only Tulle -- \n We paused before a House that seemed \n A Swelling of the Ground -- \n The Roof was scarcely visible -- \n The Cornice -- in the Ground -- \n Since then -- \'tis Centuries -- and yet \n Feels shorter than the Day \n I first surmised the Horses\' Heads \n Were toward Eternity --', posted_by=2, author_id=3, year_published=1890, audio="none")
    whitman = Poem(
        title='I Sing the Body Electric', body='1 \n I sing the body electric, \n The armies of those I love engirth me and I engirth them, \n They will not let me off till I go with them, respond to them, \n And discorrupt them, and charge them full with the charge of the soul. \n Was it doubted that those who corrupt their own bodies conceal themselves? \n And if those who defile the living are as bad as they who defile the dead? \n And if the body does not do fully as much as the soul? \n And if the body were not the soul, what is the soul?', posted_by=2, author_id=4, year_published=1855, audio="none")
    blake = Poem(
        title='The Tyger', body='Tyger Tyger, burning bright,  \n In the forests of the night;  \n What immortal hand or eye,  \n Could frame thy fearful symmetry? \n In what distant deeps or skies.  \n Burnt the fire of thine eyes? \n On what wings dare he aspire? \n What the hand, dare seize the fire? \n And what shoulder, & what art, \n Could twist the sinews of thy heart? \n And when thy heart began to beat. \n What dread hand? & what dread feet? \n What the hammer? what the chain, \n In what furnace was thy brain? \n What the anvil? what dread grasp. \n Dare its deadly terrors clasp? \n When the stars threw down their spears  \n And water\'d heaven with their tears: \n Did he smile his work to see? \n Did he who made the Lamb make thee? \n Tyger Tyger burning bright, \n In the forests of the night: \n What immortal hand or eye, \n Dare frame thy fearful symmetry?', posted_by=3, author_id=5, year_published=1794, audio="none")
    browning = Poem(
        title='Sonnet V', body='I lift my heavy heart up solemnly, \n As once Electra her sepulchral urn, \n And, looking in thine eyes, I overturn \n The ashes at thy feet. Behold and see \n What a great heap of grief lay hid in me, \n And how the red wild sparkles dimly burn \n Through the ashen greyness. If thy foot in scorn \n Could tread them out to darkness utterly, \n It might be well perhaps. But if instead \n Thou wait beside me for the wind to blow \n The grey dust up….—those laurels on thine head \n O my belovèd, will not shield thee so. \n That none of all the fires shall scorch and shred \n The hair beneath. Stand further off then! go.', posted_by=3, author_id=6, year_published=1862, audio="none")
    cummings = Poem(
        title='Spring is like a perhaps hand', body='III \n Spring is like a perhaps hand \n (which comes carefully \n out of Nowhere)arranging \n a window,into which people look(while \n people stare \n arranging and changing placing \n carefully there a strange \n thing and a known thing here)and \n changing everything carefully \n spring is like a perhaps \n Hand in a window \n (carefully to \n and fro moving New and \n Old things,while \n people stare carefully \n moving a perhaps \n fraction of flower here placing \n an inch of air there)and \n without breaking anything.', posted_by=1, author_id=7, year_published=1923, audio="none")
    shelley = Poem(
        title='To the Moon [Fragment]', body='Art thou pale for weariness \n Of climbing Heaven, and gazing on the earth, \n Wandering companionless \n Among the stars that have a different birth,— \n And ever changing, like a joyless eye \n That finds no object worth its constancy?', posted_by=1, author_id=8, year_published=1824, audio="none")
    shakespeare2 = Poem(
        title='Sonnet 18', body='Shall I compare thee to a summer’s day? \n Thou art more lovely and more temperate: \n Rough winds do shake the darling buds of May, \n And summer’s lease hath all too short a date; \n Sometime too hot the eye of heaven shines, \n And often is his gold complexion dimm\'d; \n And every fair from fair sometime declines, \n By chance or nature’s changing course untrimm\'d; \n But thy eternal summer shall not fade, \n Nor lose possession of that fair thou ow’st; \n Nor shall death brag thou wander’st in his shade, \n When in eternal lines to time thou grow’st: \n So long as men can breathe or eyes can see, \n So long lives this, and this gives life to thee.', posted_by=4, author_id=1, year_published=1609, audio="none")
    oliver = Poem(
        title='Wild Geese', body='You do not have to be good. \n You do not have to walk on your knees \n for a hundred miles through the desert, repenting. \n You only have to let the soft animal of your body \n love what it loves. \n Tell me about despair, yours, and I will tell you mine. \n Meanwhile the world goes on. \n Meanwhile the sun and the clear pebbles of the rain \n are moving across the landscapes, \n over the prairies and the deep trees, \n the mountains and the rivers. \n Meanwhile the wild geese, high in the clean blue air, \n are heading home again. \n Whoever you are, no matter how lonely, \n the world offers itself to your imagination, \n calls to you like the wild geese, harsh and exciting– \n over and over announcing your place \n in the family of things.', potd=True, posted_by=3, author_id=9, year_published=1986, audio="none")


    db.session.add(shakespeare)
    db.session.add(shakespeare2)
    db.session.add(yeats)
    db.session.add(dickinson)
    db.session.add(whitman)
    db.session.add(blake)
    db.session.add(browning)
    db.session.add(cummings)
    db.session.add(shelley)
    db.session.add(oliver)
    db.session.commit()


def undo_poems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.poems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM poems"))

    db.session.commit()
