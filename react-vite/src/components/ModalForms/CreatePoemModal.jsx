import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import * as poemActions from '../../redux/poems.js'
import "./FormModals.css";

function PoemFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const [yearPublished, setYearPublished] = useState("");
  // const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const curr_user = useSelector(state => state.session.user)
  let authors = useSelector(state => state.authors)

  let authorArr = Object.values(authors)
  const year = 0;
  const years = Array.from(new Array(2024),(val, index) => index + year);
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
    closeModal()
    navigate(`/poems/${response.id}`)
  }

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
        <label className="su-label">
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="select"
            placeholder="Author"
            required
          >
            {authorArr.map(auth => (
              <option value={auth.id}>{auth.name}</option>
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
              <option value={year}>{year}</option>
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
        <button className="button" type="submit">create</button>
      </form>
    </>
  );
}

export default PoemFormModal;