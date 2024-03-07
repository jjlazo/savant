import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Home, Signpost, MoveUp, MoveDown, Eraser, PencilLine, Reply, Flag, BookMarked } from 'lucide-react';
import { CommentFormModal, UpdatePoemFormModal, UpdateCommentFormModal } from "../ModalForms";
import OpenModalButton from "../OpenModalButton";
import { useDispatch, useSelector } from 'react-redux';
import * as poemActions from '../../redux/poems'
import * as commentActions from '../../redux/comments'
import * as bookmarkActions from '../../redux/bookmarks'
import bookmarkFilled from '../../../public/bookmark-filled.png'
import bookmarkTransparent from '../../../public/bookmark-transparent.png'
import "./Poems.css"
import { useModal } from "../../context/Modal";

function PoemDetail() {
    const navigate = useNavigate();
    const { poemId } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector((state) => state.session.user);
    let bookmarks = useSelector(state => state.bookmarks);
    const [bookmarked, setBookmarked] = useState(bookmarks.hasOwnProperty(poemId));
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(()=> {
        setBookmarked(bookmarks.hasOwnProperty(poemId))
    }, [bookmarks, poemId])

    let poem = useSelector(state => state.poems)
    let comments = useSelector(state => state.comments)

    let commentData = Object.values(comments)

    const deletePoem = (e) => {
        e.preventDefault()
        dispatch(poemActions.fetchDeletePoem(poemId))
        closeModal()
        navigate(`/`)
    }

    const deleteComment = (e, commentId) => {
        e.preventDefault()
        dispatch(commentActions.fetchDeleteComment(commentId))
        closeModal()
    }

    useEffect(() => {
        dispatch(poemActions.fetchPoems())
    }, [poemId])

    useEffect(() => {
        if (sessionUser?.id) {
            dispatch(bookmarkActions.fetchGetAllBookmarks(sessionUser?.id))
        }
    }, [sessionUser])

    const handleBookmarking = () => {
        if (bookmarked) {
            dispatch(bookmarkActions.fetchDeleteBookmark(poemId))
        } else {
            dispatch(bookmarkActions.fetchCreateBookmark(poemId))
        }
        setBookmarked(!bookmarked)
    }

    useEffect(() => {
        async function wrapperFn() {
            const response = await dispatch(poemActions.fetchPoemById(poemId))
            if (response.errors) {
                navigate('/errors', { state: { "statusCode": 404, "message": response.errors.message } })
            }
        }
        wrapperFn()
        dispatch(commentActions.fetchCommentsByPoemId(poemId))
    }, [poemId])

    const closeMenu = () => setShowMenu(false);

    return (
        <div id="poem-container">
            <div id="poem-contents">
                <p id="poem-title">{poem[poemId]?.title}
                    {sessionUser ? (<img src={bookmarked ? bookmarkFilled : bookmarkTransparent} onClick={handleBookmarking} alt="bookmark-transparent" className="bookmark-transparent" />) : null}
                </p>
                <p id="poem-author">{poem[poemId]?.author}
                    <div className="poem-update">
                        {(sessionUser?.id == poem[poemId]?.posted_by) && <OpenModalButton
                            onButtonClick={closeMenu}
                            buttonText={<Eraser className="update-icon" />}
                            modalComponent={(
                                <div id="confirm-delete-modal">
                                    <h2 id="form-label">Confirm Delete</h2>
                                    <span>Are you sure you want to remove this poem?</span>
                                    <button id='confirm-delete-button' type='button' onClick={(e)=> deletePoem(e, poemId)}>Yes</button>
                                    <button id='confirm-delete-cancel' type='button' onClick={closeModal}>No </button>
                                </div>
                            )}
                        />}
                        {sessionUser?.id == poem[poemId]?.posted_by && <OpenModalButton
                            onButtonClick={closeMenu}
                            modalComponent={<UpdatePoemFormModal defaultTitle={poem[poemId]?.title} defaultBody={poem[poemId]?.body} defaultAuthor={poem[poemId]?.author_id} defaultYearPublished={poem[poemId]?.year_published} />}
                            buttonText={<PencilLine strokeWidth={"2.05px"} className="update-icon" />}
                        />}
                    </div>
                </p>
                {poem[poemId]?.body.split('\n').map(line => <p key={line} className="line">{line}</p>)}
            </div>
            <div className="comment-content-container">
                <div className="comments-info">
                    {sessionUser?.id && <OpenModalButton
                        onButtonClick={closeMenu}
                        modalComponent={<CommentFormModal />}
                        buttonText={<>
                            <Reply />
                            comment
                        </>}
                    />}
                    <div id="comment-count">{commentData.length} {commentData.length == 1 ? 'comment' : "comments"}</div>
                </div>
                {commentData?.map((comment) => (
                    <div key={comment?.id} className="comment-content">
                        <div className="comment-header">
                            <div><b>{comment?.username}</b></div>
                            <div className="comment-update">
                                {(sessionUser?.id == comment?.user_id) && <OpenModalButton
                                    onButtonClick={closeMenu}
                                    buttonText={<Eraser className="update-icon" />}
                                    modalComponent={(
                                        <div id="confirm-delete-modal">
                                            <h2 id="form-label">Confirm Delete</h2>
                                            <span>Are you sure you want to remove this comment?</span>
                                            <button id='confirm-delete-button' type='button' onClick={(e)=> deleteComment(e, comment.id)}>Yes</button>
                                            <button id='confirm-delete-cancel' type='button' onClick={closeModal}>No </button>
                                        </div>
                                    )}
                                />}
                                {sessionUser?.id == comment?.user_id && <OpenModalButton
                                    onButtonClick={closeMenu}
                                    modalComponent={<UpdateCommentFormModal commentId={comment?.id} defaultBody={comment?.body} />}
                                    buttonText={<PencilLine className="update-icon" />}
                                />}
                                {comment?.created_at != comment?.updated_at && <div className="edited">Edited</div>}
                            </div>
                            <div>{comment?.body}</div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default PoemDetail
