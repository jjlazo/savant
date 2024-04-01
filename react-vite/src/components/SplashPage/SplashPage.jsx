import React, { useEffect, useMemo, useState } from "react"
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
    const [readMore, setReadMore] = useState(false);
    // if poem is shorter than x dont show button
    // let poems = useSelector(poemActions.selectAllPoems)
    // let poem = useSelector(poemActions.selectPoemOfTheDay)

    useEffect(() => {
        dispatch(poemActions.fetchPoems())
        // dispatch(poemActions.fetchPoemOfTheDay())
        dispatch(authorActions.fetchAuthors())
    }, [dispatch])

    const navigateToAuthor = (e, author_id) => {
        e.stopPropagation()
        navigate(`/authors/${author_id}`)
    }

    const potd = useMemo(()=> {
        let poemArr = Object.values(poems)
        return poemArr.filter(poem => poem?.['potd'] == true)
    }, [poems])

    const lines = useMemo(()=> {
        if (readMore === true) return potd[0]?.body.split("\n").map(line => <p key={line} className='line'>{line}</p>)
        if (readMore === false) return potd[0]?.body.split("\n").map((line, i) => {if (i < 4) return (<p key={line} className="line">{line}</p>)})
    }, [poems, readMore])

    return (
        <>
            <div className="splash-container">
                <p id="potd-header">Poem of the Day</p>
                <div id="poem-of-the-day">
                    <h3 id="potd-title">{potd[0]?.title}</h3>
                    <h4 id="potd-author" onClick={(e) => navigateToAuthor(e, potd[0]?.author_id)} className="poem-author">{potd[0]?.author}</h4>
                    {lines}
                    <button type="button" onClick={()=> setReadMore(!readMore)}>{readMore ? "Show Less" : "Read More"}</button>
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
