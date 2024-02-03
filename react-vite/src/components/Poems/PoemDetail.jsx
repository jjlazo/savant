import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
// import { Home, Signpost, MoveUp, MoveDown, Eraser, PencilLine, Reply, Flag } from 'lucide-react';
import { CommentFormModal, UpdatePoemModal, UpdateCommentmModal } from "../ModalForms";
import OpenModalButton from "../OpenModalButton";
import { useDispatch, useSelector } from 'react-redux';
import * as poemActions from '../../redux/poems'
import * as commentActions from '../../redux/comments'
import bookmarkFilled from '../../../public/bookmark-filled.png'
import bookmarkTransparent from '../../../public/bookmark-transparent.png'
import replyArrow from '../../../public/reply.png'
import "./Poems.css"

function PoemDetail() {
    const navigate = useNavigate()
    const { poemId } = useParams()
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()

    let poem = useSelector(state => state.poems)
    let comments = useSelector(state => state.comments)

    let commentData = Object.values(comments)

    // const deletePost = (e) => {
    //     e.preventDefault()
    //     dispatch(poemActions.fetchDeletePoem(poemId))
    //     // navigate(`/user/${sessionUser.id}/poems/`)
    // }

    // const deleteComment = (e, commentId) => {
    //     e.preventDefault()
    //     dispatch(commentActions.fetchDeleteComment(commentId))
    // }
    useEffect(()=> {
        dispatch(poemActions.fetchPoems())
    }, [poemId])

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
        <p>{poem[poemId]?.body}</p>

        {sessionUser ? (<img src={bookmarkTransparent} onClick={() => alert("feature coming soon")} alt="bookmark-transparent" className="bookmark-transparent"/>) : null}
        {sessionUser?.id && <OpenModalButton
                            onButtonClick={closeMenu}
                            modalComponent={<CommentFormModal />}
                            buttonComponent={
                                <button className="comments-button">
                                    <img src={replyArrow} alt="reply-arrow" className="reply-arrow"/>
                                leave a comment
                                </button>
                            }
                            />}
        </div>
    )
}

export default PoemDetail
