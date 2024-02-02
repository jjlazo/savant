import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
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

    return (
        <div className="splash-container">
            <p>Poem of the Day</p>
            <div id="poem-of-the-day">

            </div>
            <div className="container-content">
                <div className="feed">
                    <Feed data={poemArr} />
                </div>
            </div>
        </div>
    );
}

export default SplashPage;
