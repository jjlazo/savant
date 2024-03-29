import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as poemActions from '../../redux/poems'
import * as authorActions from '../../redux/authors'
import bookwormError from '../../../public/boooookworm.png';

function AllPoems() {
    const navigate = useNavigate()
    let authors = useSelector(authorActions.selectAllAuthors)
    const dispatch = useDispatch()
    let poems = useSelector(state => state.poems)

    let data = Object.values(poems)
    let authorArr = Object.values(authors)

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

    const authorName = (id) => {
        return authorArr.map(author => {
            if (author.id === id) {
                return author.name
            }
        })
    }

    return (
        <div id="all-poems-container">
            <h3 id="all-poems-header">Poems</h3>
            {
                data?.map((poem) => (
                    <div key={poem.id} className="content">
                        <div className="poem-bubble">
                            <div>
                                <div className="poem-header">
                                    <div onClick={() => navigate(`/poems/${poem.id}`)} className="poem-title">{poem?.title}</div>
                                </div>
                                <br/>
                                <div onClick={(e) => navigateToAuthor(e, poem.author_id)} className="poem-author">
                                    <b>by {authorName(poem.author_id)}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            {!data.length &&
                <div className="no-poems">
                    <img className="book-worm" src={bookwormError} alt="bookworm" />
                    <div className="no-poem-text"><b>No poems found!</b></div>
                </div>
            }
        </div>
    )
}

export default AllPoems
