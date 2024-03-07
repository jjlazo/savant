import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./SplashPage.css"
import { useDispatch, useSelector } from 'react-redux';
import * as poemActions from '../../redux/poems'
import * as authorActions from '../../redux/authors'
import { Github, Linkedin } from 'lucide-react'

function SplashPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let poems = useSelector(state => state.poems)
    // let poems = useSelector(poemActions.selectAllPoems)
    // let poem = useSelector(poemActions.selectPoemOfTheDay)

    let poemArr = Object.values(poems)
    let potd = poemArr.filter(poem => poem?.['potd'] == true)

    useEffect(() => {
        dispatch(poemActions.fetchPoems())
        // dispatch(poemActions.fetchPoemOfTheDay())
        dispatch(authorActions.fetchAuthors())
    }, [dispatch])

    const navigateToAuthor = (e, author_id) => {
        e.stopPropagation()
        navigate(`/authors/${author_id}`)
    }


    return (
        <>
            <div className="splash-container">
                <p id="potd-header">Poem of the Day</p>
                <div id="poem-of-the-day">
                    <h3 id="potd-title">{potd[0]?.title}</h3>
                    <h4 id="potd-author" onClick={(e) => navigateToAuthor(e, potd[0]?.author_id)} className="poem-author">{potd[0]?.author}</h4>
                    {potd[0]?.body.split("\n").map(line => <p key={line} className='line'>{line}</p>)}
                </div>
                <h3 id="browse-container">Browse Our Collections:</h3>
                <div id="collections-container">
                    <div className="explore-button">
                        <button onClick={() => navigate(`/poems`)} className="button">Poems</button>
                    </div>
                    <div className="explore-button">
                        <button onClick={() => navigate(`/authors`)} className="button">Authors</button>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <a href="https://github.com/jjlazo" title="github" className="footer-links"><Github /></a>
                <a href="https://www.linkedin.com/in/juniper-lazo/" title="linkedin" className="footer-links"><Linkedin /></a>
            </footer>
        </>
    );
}

export default SplashPage;
