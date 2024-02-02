import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Feed.css"

function Feed({ data }) {
    const navigate = useNavigate()
    let authors = useSelector(state => state.authors)

    let authorArr = Object.values(authors)

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
        <>
            {
                data.map((poem) => (
                    <div key={poem.id} onClick={() => navigate(`/poems/${poem.id}`)} className="content">
                        <div className="poem-bubble">
                            <div>
                                <div className="poem-header">
                                    <div>
                                        <div onClick={(e) => navigateToAuthor(e, poem.author_id)} className="poem-author">
                                            <b>{authorName(poem.author_id)}</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="poem-content">
                                    <div className="poem-title">{poem.title}</div>
                                    <div>{poem.body}</div>
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                    </div>
                ))
            }
            {!data.length &&
                <div className="no-poems">
                    <img className="book-worm" src={""} alt="bookworm" />
                    <div className="no-poem-text"><b>No poems found!</b></div>
                </div>
            }
        </>
    )
}

export default Feed
