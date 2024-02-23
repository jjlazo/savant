import React, { useState, useRef, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Eraser, PencilLine } from 'lucide-react';
import { UpdateAuthorFormModal, UpdatePoemFormModal } from "../ModalForms";
import { useDispatch, useSelector } from 'react-redux';
import * as poemActions from '../../redux/poems'
import * as authorActions from '../../redux/authors'
import OpenModalButton from "../OpenModalButton";
import { useModal } from "../../context/Modal";
import './UserHome.css'


function UserHome() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const { userId } = useParams()
    const ulRef = useRef();
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector((state) => state.session.user)
    let poems = useSelector(state => state.poems)
    let authors = useSelector(authorActions.selectAllAuthors)

    const authorArr = Object.values(authors)
    const poemArr = Object.values(poems)

    const authored_by = authorArr?.filter(author => author?.posted_by === sessionUser?.id);
    const poem_by = poemArr?.filter(poem => poem?.posted_by == sessionUser?.id);

    // console.log({authors, authorArr, authored_by})
    window.authors = authors;
    window.poems = poems;


    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("click", closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);
    if (sessionUser?.id !== parseInt(userId, 10)) {
        navigate('/');
    }

    useEffect(() => {
        async function wrapperFn() {
            const response = await dispatch(authorActions.fetchAuthors())
            if (response?.errors) {
                console.log("errors detected")
                navigate('/errors', { state: { "statusCode": 404, "message": response.errors.message } })
            }
        }

        wrapperFn()
    }, []);

    useEffect(() => {
        async function wrapperFn() {
            const response = await dispatch(poemActions.fetchPoems())
            if (response?.errors) {
                navigate('/errors', { state: { "statusCode": 404, "message": response.errors.message } })
            }
        }

        wrapperFn()
    }, [])

    const deleteAuthor = (e, authorId) => {
        e.preventDefault()
        dispatch(authorActions.fetchDeleteAuthor(authorId));
        closeModal()
    }

    const deletePoem = (e, poemId) => {
        e.preventDefault()
        dispatch(poemActions.fetchDeletePoem(poemId))
        closeModal()
    }

    return (
        <div className="home-container">
            <h3 id="home-page-label">Home</h3>
            <div className="creations-container">
                <h4>Your Authors</h4>
                {authored_by?.map(author => (
                    <div key={author.id}>
                        {author?.name}
                        {author?.name &&
                            (<>
                                <OpenModalButton
                                    onButtonClick={closeMenu}
                                    buttonText={<Eraser className="update-icon" />}
                                    modalComponent={(
                                        <div id="confirm-delete-modal">
                                            <h2 id="form-label">Confirm Delete</h2>
                                            <span>Are you sure you want to remove this author?</span>
                                            <button id='confirm-delete-button' type='button' onClick={(e) => deleteAuthor(e, author.id)}>Yes</button>
                                            <button id='confirm-delete-cancel' type='button' onClick={closeModal}>No </button>
                                        </div>
                                    )}
                                />
                                <OpenModalButton
                                    onButtonClick={closeMenu}
                                    modalComponent={<UpdateAuthorFormModal authorId={author?.id}  defaultName={author?.name} defaultBiography={author?.biography} />}
                                    buttonText={<PencilLine strokeWidth={"2.05px"} className="update-icon" />}
                                />
                            </>)
                        }
                    </div>
                ))}
            </div>
            <div className="creations-container">
                <h4>Your Poems</h4>
                {poem_by?.map(poem => (
                    <div key={poem.id}>
                        {poem?.title}
                        {poem?.title &&
                            (<>
                                <OpenModalButton
                                    onButtonClick={closeMenu}
                                    buttonText={<Eraser className="update-icon" />}
                                    modalComponent={(
                                        <div id="confirm-delete-modal">
                                            <h2 id="form-label">Confirm Delete</h2>
                                            <span>Are you sure you want to remove this poem?</span>
                                            <button id='confirm-delete-button' type='button' onClick={(e) => deletePoem(e, poem.id)}>Yes</button>
                                            <button id='confirm-delete-cancel' type='button' onClick={closeModal}>No </button>
                                        </div>
                                    )}
                                />
                                <OpenModalButton
                                    onButtonClick={closeMenu}
                                    modalComponent={<UpdatePoemFormModal defaultTitle={poem?.title} defaultBody={poem?.body} defaultAuthor={poem?.author_id} defaultYearPublished={poem?.year_published} />}
                                    buttonText={<PencilLine strokeWidth={"2.05px"} className="update-icon" />}
                                />
                            </>)
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserHome
