import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
// import OpenModalButton from "../OpenModalButton";
// import { CommentFormModal, UpdatePostFormModal, UpdateCommentFormModal } from "../ModalComponents";
import { useDispatch, useSelector } from 'react-redux';
import * as poemActions from '../../redux/poems'
import * as authorActions from '../../redux/authors'
import Feed from '../Feed'


function AuthorDetail() {
    const navigate = useNavigate()
    const { authorId } = useParams()
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()

    const poems = useSelector(state => state.poems)
    let poemData = Object.values(poems)
    const author = useSelector(state => state.authors)

    // conditional for poster of author
    // const deleteAuthor = (e) => {
    //     e.preventDefault()
    //     dispatch(authorActions.fetchDeleteAuthor(authorId))
    //     // navigate(`/user/${sessionUser.id}/poems/`)
    // }

    useEffect(() => {
        dispatch(poemActions.getPoemsByAuthorId(authorId))
    }, [dispatch])

    useEffect(() => {
        dispatch(authorActions.fetchAuthors())
    }, [dispatch])

    useEffect(() => {
        async function wrapperFn() {
            const response = await dispatch(authorActions.fetchAuthorById(authorId))
            if (response.errors) {
                navigate('/errors', { state: { "statusCode": 404, "message": response.errors.message } })
            }
        }
        wrapperFn()
    }, [authorId])

    const closeMenu = () => setShowMenu(false);

    return (
        <>
        {<p>{author[authorId]?.name}</p>}
        {<p>{author[authorId]?.biography}</p>}
        <p>Browse our Collection</p>
        <Feed data={poemData}/>
        </>
    )
}

export default AuthorDetail