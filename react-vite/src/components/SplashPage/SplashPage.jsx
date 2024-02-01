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
    let authors = useSelector(state => state.authors)

    let poemArr = Object.values(poems)
    let authorArr = Object.values(authors)

    // useEffect(() => {
    //     dispatch(poemActions.fetchPoems())
    // }, [])

    useEffect(() => {
        dispatch(authorActions.fetchAuthors())
    }, [])

    return (
        <div className="splash-container">
            <div className="container-content">
            <div className="feed">
                <Feed data={authorArr}/>
            </div>
            </div>
        </div>
    );
  }

  export default SplashPage;
