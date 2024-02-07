import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
// import { PoemFormModal } from "../ModalComponents";
import { useDispatch, useSelector } from 'react-redux';
import * as poemActions from '../../redux/poems'
import * as authorActions from '../../redux/authors'
import Feed from '../Feed'
import { UpdateAuthorFormModal } from "../ModalForms";
import { Eraser, PencilLine } from "lucide-react";
import OpenModalButton from "../OpenModalButton";
import './Authors.css'



function AuthorDetail() {
    const navigate = useNavigate()
    const { authorId } = useParams()
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()

    const poems = useSelector(state => state.poems)
    let poemData = Object.values(poems)
    const author = useSelector(state => state.authors)

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

    const deleteAuthor = (e) => {
        e.preventDefault()
        dispatch(authorActions.fetchDeleteAuthor(authorId));
        navigate(`/`)
    }

    return (
        <div id="author-detail-container">
            {<h3 id="author-name">{author[authorId]?.name}</h3>}
            <div id="update-icons">
                {(sessionUser?.id == author[authorId]?.posted_by) && <button onClick={deleteAuthor}>
                    <Eraser strokeWidth={"2.05px"} className="update-icon" />
                </button>}
                {sessionUser?.id == author[authorId]?.posted_by && <OpenModalButton
                    onButtonClick={closeMenu}
                    modalComponent={<UpdateAuthorFormModal defaultName={author[authorId]?.name} defaultBiography={author[authorId]?.biography} />}
                    buttonText={<PencilLine strokeWidth={"2.05px"} className="update-icon" />}
                />}
            </div>
            {<p id="author-bio">{author[authorId]?.biography}</p>}
            <p id="browse-tag">Browse our Collection:</p>
            {poemData.map(poem => (<h4 key={poem.id} onClick={()=> navigate(`/poems/${poem.id}`)} className="poem-titles">{poem?.author_id == authorId && poem?.title}</h4>))}
        </div>
    )
}

export default AuthorDetail
