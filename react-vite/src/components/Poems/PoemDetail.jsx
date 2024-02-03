import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
// import { Home, Signpost, MoveUp, MoveDown, Eraser, PencilLine, Reply, Flag } from 'lucide-react';
import OpenModalButton from "../OpenModalButton";
// import { CommentFormModal, UpdatePostFormModal, UpdateCommentFormModal } from "../ModalComponents";
import { useDispatch, useSelector } from 'react-redux';
import * as poemActions from '../../redux/poems'
import * as commentActions from '../../redux/comments'


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
        <>
        <p>{poem[poemId]?.title}</p>
        <p>{poem[poemId]?.body}</p>
        </>
    )
}

export default PoemDetail
