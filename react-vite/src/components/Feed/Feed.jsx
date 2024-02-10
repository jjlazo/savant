import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as poemActions from '../../redux/poems'
import * as bookmarkActions from '../../redux/bookmarks'
import bookwormError from '../../../public/boooookworm.png';
import bookmarkFilled from '../../../public/bookmark-filled.png'
import bookmarkTransparent from '../../../public/bookmark-transparent.png'
import "./Feed.css"

function Feed({ data }) {
    const navigate = useNavigate()
    let authors = useSelector(state => state.authors)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    let authorArr = Object.values(authors)
    let bookmarks = useSelector(state => state.bookmarks)
    let bookmarkArray = Object.values(bookmarks)

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

    const bookmarkedPoem = (poemId) => {
        const userBookmarks = bookmarkArray?.map(poem => poem.id)
        if (userBookmarks.includes(poemId)) return true;
        return false
    }

    // useEffect(() => {
    //     dispatch(poemActions.fetchPoems())
    // }, [dispatch])

    const handleBookmarking = (e, poemId) => {
        if (bookmarkedPoem(poemId)) {
            dispatch(bookmarkActions.fetchDeleteBookmark(poemId))
        } else {
            dispatch(bookmarkActions.fetchCreateBookmark(poemId))
        }
    }


    return (
        <>
            {
                data.map((poem) => (
                    <div key={poem.id} className="content">
                        <div className="poem-bubble">
                            <div>
                                <div className="poem-header">
                                    <div className="poem-title" onClick={() => navigate(`/poems/${poem.id}`)}>{poem.title}</div>
                                    {sessionUser ? (<img src={bookmarkedPoem(poem.id) ? bookmarkFilled : bookmarkTransparent} onClick={(e)=> handleBookmarking(e, poem.id)} alt="bookmark-transparent" className="bookmark-transparent" />) : null}
                                </div>
                                <div onClick={(e) => navigateToAuthor(e, poem.author_id)} className="poem-author">
                                    <b>{authorName(poem.author_id)}</b>
                                </div>
                                <div className="poem-content">
                                    {poem.body.split('\n').map(line => <p className="poem-body" key={line}>{line}</p>)}
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                    </div>
                ))
            }
            {!data.length &&
                <div className="no-poems">
                    <img className="book-worm" src={bookwormError} alt="bookworm" />
                    <div className="no-poem-text"><b>No poems found!</b></div>
                </div>
            }
        </>
    )
}

export default Feed
