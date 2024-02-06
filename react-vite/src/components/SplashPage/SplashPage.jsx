import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import "./SplashPage.css"
import Feed from "../Feed";
import { useDispatch, useSelector } from 'react-redux';
import * as poemActions from '../../redux/poems'
import * as authorActions from '../../redux/authors'

function SplashPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let poems = useSelector(state => state.poems)

    let poemArr = Object.values(poems)

    useEffect(() => {
        dispatch(poemActions.fetchPoems())
    }, [dispatch])

    useEffect(() => {
        dispatch(authorActions.fetchAuthors())
    }, [dispatch])

    const navigateToAuthor = (e, author_id) => {
        e.stopPropagation()
        navigate(`/authors/${author_id}`)
    }


    return (
        <div className="splash-container">
            <p id="potd-header">Poem of the Day</p>
            <div id="poem-of-the-day">
                <h3 id="potd-title">{poemArr[0]?.title}</h3>
                <h4 id="potd-author" onClick={(e) => navigateToAuthor(e, poemArr[0]?.author_id)} className="poem-author">{poemArr[0]?.author}</h4>
                {poemArr[0]?.body.split("\n").map(line => <p key={line} className='line'>{line}</p>)}

            </div>
                <h2 id="browse-container">Browse Our Collections:</h2>
            <div id="collections-container">
                <div className="explore-button">
                    <button onClick={()=> navigate(`/poems`)} className="button">Poems</button>
                </div>
                <div className="explore-button">
                    <button onClick={() => navigate(`/authors`)} className="button">Authors</button>
                </div>
            </div>
            {/* <div className="container-content">
                <div className="feed">
                    <Feed data={poemArr} />
                </div>
            </div> */}
        </div>
    );
}

export default SplashPage;
