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
    oliver2 = Poem(
        title='The Sun', body='Have you ever seen \n anything \n in your life \n more wonderful \n  \n than the way the sun, \n every evening, \n relaxed and easy, \n floats toward the horizon \n  \n and into the clouds or the hills, \n or the rumpled sea, \n and is gone-- \n and how it slides again \n  \n out of the blackness, \n every morning, \n on the other side of the world, \n like a red flower \n  \n streaming upward on its heavenly oils, \n say, on a morning in early summer, \n at its perfect imperial distance-- \n and have you ever felt for anything \n such wild love-- \n do you think there is anywhere, in any language, \n a word billowing enough \n for the pleasure \n  \n that fills you, \n as the sun \n reaches out, \n as it warms you \n  \n as you stand there, \n empty-handed-- \n or have you too \n turned from this world-- \n  \n or have you too \n gone crazy \n for power, \n for things?', posted_by=3, author_id=9, year_published=1992, audio="none")
    shakespeare3 = Poem(
        title="Sonnet 27", body="    Weary with toil, I haste me to my bed, \n The dear repose for limbs with travel tired; \n But then begins a journey in my head, \n To work my mind, when body’s work’s expired: \n For then my thoughts, from far where I abide, \n Intend a zealous pilgrimage to thee, \n And keep my drooping eyelids open wide, \n Looking on darkness which the blind do see: \n Save that my soul’s imaginary sight \n Presents thy shadow to my sightless view, \n Which, like a jewel hung in ghastly night, \n Makes black night beauteous and her old face new. \n     Lo! Thus, by day my limbs, by night my mind, \n     For thee and for myself no quiet find.", posted_by=6, author_id=1, year_published=1609, audio="none")
    shelley2 = Poem(
        title="The Magi", body="    Now as at all times I can see in the mind's eye, \n In their stiff, painted clothes, the pale unsatisfied ones \n Appear and disappear in the blue depth of the sky \n With all their ancient faces like rain-beaten stones, \n And all their helms of silver hovering side by side, \n And all their eyes still fixed, hoping to find once more, \n Being by Calvary's turbulence unsatisfied, \n The uncontrollable mystery on the bestial floor.", posted_by=6, author_id=8, year_published=1989, audio="none")
    blake2 = Poem(
        title="A Divine Image", body="Cruelty has a Human heart \n And Jealousy a Human Face, \n Terror, the Human Form Divine, \n And Secrecy, the Human Dress. \n  \n The Human Dress is forgéd Iron, \n The Human Form, a fiery Forge, \n The Human Face, a Furnace seal'd, \n The Human Heart, its hungry Gorge.", posted_by=6, author_id=5, year_published=1789, audio="none")
    cummings2 = Poem(
        title="Summer Silence", body="Eruptive lightnings flutter to and fro \n Above the heights of immemorial hills; \n Thirst-stricken air, dumb-throated, in its woe \n Limply down-sagging, its limp body spills \n Upon the earth. A panting silence fills \n The empty vault of Night with shimmering bars \n Of sullen silver, where the lake distils \n Its misered bounty.—Hark! No whisper mars \n The utter silence of the untranslated stars.", posted_by=5, author_id=7, year_published=1913, audio="none")
    dickinson2 = Poem(
        title="I could suffice for Him, I knew", body="I could suffice for Him, I knew— \n He—could suffice for Me— \n Yet Hesitating Fractions—Both \n Surveyed Infinity— \n  \n 'Would I be Whole' He sudden broached— \n My syllable rebelled— \n 'Twas face to face with Nature—forced— \n 'Twas face to face with God— \n  \n Withdrew the Sun—to Other Wests— \n Withdrew the furthest Star \n Before Decision—stooped to speech— \n And then—be audibler \n  \n The Answer of the Sea unto \n The Motion of the Moon— \n Herself adjust Her Tides—unto— \n Could I—do else—with Mine?", posted_by=5, author_id=3, year_published=1890, audio="none")
    # poet = Poem(
    #     title="", body="", posted_by=5, author_id=8, year_published=1, audio="none")

    db.session.add(shakespeare)
    db.session.add(shakespeare2)
    db.session.add(shakespeare3)
    db.session.add(yeats)
    db.session.add(dickinson)
    db.session.add(dickinson2)
    db.session.add(whitman)
    db.session.add(blake)
    db.session.add(blake2)
    db.session.add(browning)
    db.session.add(cummings)
    db.session.add(cummings2)
    db.session.add(shelley)
    db.session.add(shelley2)
    db.session.add(oliver)
    db.session.add(oliver2)
    db.session.commit()


def undo_poems():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.poems RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM poems"))

    db.session.commit()
