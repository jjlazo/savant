import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as poemActions from '../../redux/poems'
import * as authorActions from '../../redux/authors'
import bookwormError from '../../../public/boooookworm.png';
import './Authors.css'

function AllAuthors() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let authors = useSelector(authorActions.selectAllAuthors)
    let poems = useSelector(state => state.poems)

    let data = Object.values(poems)
    let authorArr = Object.values(authors)

    useEffect(() => {
        dispatch(poemActions.fetchPoems())
    }, [dispatch])

    useEffect(() => {
        dispatch(authorActions.fetchAuthors())
    }, [dispatch])

    // const navigateToAuthor = (e, author_id) => {
    //     e.stopPropagation()
    //     navigate(`/authors/${author_id}`)
    // }

    // const authorName = (id) => {
    //     return authorArr.map(author => {
    //         if (author.id === id) {
    //             return author.name
    //         }
    //     })
    // }

    return (
        <div id="all-authors-container">
            <h3 id="authors-header">
            All Authors
            </h3>
            {
                authorArr?.map((author) => (
                    <div key={author?.id} className="content">
                        <b className="authors-list" onClick={() => navigate(`/authors/${author?.id}`)}>{author?.name}:</b>
                        <div className="poem-bubble">
                            <br/>
                            {data?.map(poem => (
                                <div key={poem.id} className="poem-header">
                                    <div className="poem-title" onClick={()=> navigate(`/poems/${poem?.id}`)}>{poem?.author_id == author.id && poem?.title}</div>
                                </div>
                            )
                            )}
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

export default AllAuthors
