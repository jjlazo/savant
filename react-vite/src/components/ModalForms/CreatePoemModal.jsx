import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import * as poemActions from '../../redux/poems.js'
import * as authorActions from '../../redux/authors.js'
import "./FormModals.css";
import AuthorFormModal from "./CreateAuthorModal.jsx";

function PoemFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { pushModalContent } = useModal();

  const currentYear = new Date().getFullYear();
  const curr_user = useSelector(state => state.session.user)
  let authors = useSelector(authorActions.selectAllAuthors)
  const currentAuthorId = useSelector(authorActions.selectCurrentAuthor);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState(currentAuthorId);

  const [yearPublished, setYearPublished] = useState(currentYear);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    dispatch(authorActions.fetchAuthors())

    return () => {
      dispatch(authorActions.setCurrentAuthor(1));
    }
}, [dispatch])

  let authorArr = Object.values(authors)

  const years = Array.from(new Array(currentYear + 1),(val, index) => index);
  const revyears = years.reverse()

  const sendPoem = async (e) => {
    e.preventDefault()
    const response = await dispatch(poemActions.fetchCreatePoem({
      title,
      body,
      "author_id": author,
      "posted_by": curr_user.id,
      "year_published": yearPublished
    }))
    if (response.ok) {
      closeModal()
      navigate(`/poems/${response.id}`)
    } else {
      setErrors(response.errors);
    }
  }

  const renderErrors = (errors = []) => errors.map(e => <p key={e} className="error-message">{e}</p>);

  return (
    <>
      <h2 id="form-label">Share a Poem</h2>
      <form className="form" onSubmit={sendPoem}>
        <label className="su-label">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            placeholder="Title"
            required
          />
        </label>
        <div className="error-messages">{renderErrors(errors.title)}</div>
        <label className="su-label">
          <select
            value={author}
            onChange={(e) => {
              if (e.target.value === "Not Listed") {
                pushModalContent({ component: <AuthorFormModal onSuccess={newAuthorId => { dispatch(authorActions.setCurrentAuthor(newAuthorId)) }} /> });
              } else {
                setAuthor(e.target.value);
              }
            }}
            className="select"
            placeholder="Author"
            required
          >
            {authorArr.map(auth => (
              <option key={auth.id} value={auth.id}>{auth.name}</option>
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
              <option key={year} value={year}>{year}</option>
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
        <div className="error-messages">{renderErrors(errors.body)}</div>
        <button className="button" type="submit">create</button>
      </form>
    </>
  );
}

export default PoemFormModal;
