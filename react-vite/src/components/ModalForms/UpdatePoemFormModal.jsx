import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as poemActions from '../../redux/poems'
import * as authorActions from '../../redux/authors'
import { useParams } from "react-router-dom";
import "./FormModals.css";

function UpdatePoemFormModal({ defaultTitle, defaultBody, defaultAuthor, defaultYearPublished }) {
    const dispatch = useDispatch();
    const { poemId } = useParams()
    const [title, setTitle] = useState(defaultTitle);
    const [body, setBody] = useState(defaultBody);
    const [author, setAuthor] = useState(defaultAuthor);
    const [yearPublished, setYearPublished] = useState(defaultYearPublished);
    const { closeModal } = useModal();
    // const [errors, setErrors] = useState({});
    const curr_user = useSelector(state => state.session.user)
    let authors = useSelector(state => state.authors)
    let authorArr = Object.values(authors)
    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(currentYear + 1),(val, index) => index);
    const revyears = years.reverse()

    useEffect(() =>  {
        dispatch(authorActions.fetchAuthors())
    }, [dispatch])

    const updatePoem = (e) => {
        e.preventDefault()
        dispatch(poemActions.fetchUpdatePoem(poemId, {
            title,
            body,
            "author_id": author,
            "posted_by": curr_user.id,
            "year_published": yearPublished
        }))
        closeModal()
    }

    return (
        <>
            <h2>Update Poem</h2>
            <form className="form" onSubmit={updatePoem}>
                <label className="su-label">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input"
                        placeholder={title}
                        required
                    />
                </label>
                <label className="su-label">
                    <select
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="select"
                        placeholder="Author"
                        required
                    >
                        {authorArr.map(auth => (
                            <option value={auth.id} key={auth.id}>{auth.name}</option>
                        ))}
                        <option value={"Not Listed"}>Not Listed</option>
                    </select>
                </label>
                <label className="su-label">
                    <select
                        value={yearPublished}
                        onChange={(e) => setYearPublished(e.target.value)}
                        className="select"
                        required
                    >
                        {revyears.map(year => (
                            <option value={year} key={year}>{year}</option>
                        ))}
                    </select>
                </label>
                <label className="su-label">
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="textarea"
                        placeholder="Body"
                        required
                    />
                </label>
                <button className="button" type="submit">update</button>
            </form>
        </>
    );
}

export default UpdatePoemFormModal;
