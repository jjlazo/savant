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
import replyArrow from '../../../public/reply.png'
import "./Poems.css"

function PoemDetail() {
    const navigate = useNavigate()
    const { poemId } = useParams()
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)
    let bookmarks = useSelector(state => state.bookmarks)
    const [bookmarked, setBookmarked] = useState(bookmarks.hasOwnProperty(poemId));
    const dispatch = useDispatch()

    let poem = useSelector(state => state.poems)
    let comments = useSelector(state => state.comments)

    let commentData = Object.values(comments)

    const deletePost = (e) => {
        e.preventDefault()
        dispatch(poemActions.fetchDeletePoem(poemId))
        navigate(`/`)
    }

    const deleteComment = (e, commentId) => {
        e.preventDefault()
        dispatch(commentActions.fetchDeleteComment(commentId))
    }

    useEffect(() => {
        dispatch(poemActions.fetchPoems())
    }, [poemId])

    const handleBookmarking = () => {
        if(bookmarked){
            dispatch(bookmarkActions.fetchDeleteBookmark(poemId))
        }else{
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
        <div>
            <p>{poem[poemId]?.title}</p>
            {sessionUser ? (<img src={bookmarked ? bookmarkFilled : bookmarkTransparent} onClick={handleBookmarking} alt="bookmark-transparent" className="bookmark-transparent" />) : null}

            {poem[poemId]?.body.split('\n').map(line => <p key={line}>{line}</p>)}
            <div className="poem-update">
                {(sessionUser?.id == poem[poemId]?.posted_by) && <Eraser onClick={deletePost} strokeWidth={"2.05px"} className="update-icon" />}
                {sessionUser?.id == poem[poemId]?.posted_by && <OpenModalButton
                    onButtonClick={closeMenu}
                    modalComponent={<UpdatePoemFormModal defaultTitle={poem[poemId]?.title} defaultBody={poem[poemId]?.body} defaultAuthor={poem[poemId]?.author_id} defaultYearPublished={poem[poemId]?.year_published} />}
                    buttonText={<PencilLine strokeWidth={"2.05px"} className="update-icon" />}
                />}
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
                    <div>{commentData.length} {commentData.length == 1 ? 'comment' : "comments"}</div>
                </div>
                {commentData.map((comment) => (
                    <div key={comment?.id} className="comment-content">
                        <div>
                            <div><b>{comment?.username}</b></div>
                            <div>{comment?.body}</div>
                            <div className="comment-update">
                                {(sessionUser?.id == comment?.user_id) && <Eraser onClick={(e) => deleteComment(e, comment.id)} strokeWidth={"2.05px"} className="update-icon" />}
                                {sessionUser?.id == comment?.user_id && <OpenModalButton
                                    onButtonClick={closeMenu}
                                    modalComponent={<UpdateCommentFormModal commentId={comment?.id} defaultBody={comment?.body} />}
                                    buttonText={<PencilLine className="update-icon" />}
                                />}
                                {comment?.created_at != comment?.updated_at && <div className="edited">Edited</div>}
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default PoemDetail
