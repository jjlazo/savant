import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import * as poemActions from '../../redux/poems'
import "./CreateAuthor.css";

function PoemFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const curr_user = useSelector(state => state.session.user)

  const sendPoem = async (e) => {
    e.preventDefault()
    const response = await dispatch(poemActions.createPoem({
      title,
      body,
      author_id,
      "posted_by": curr_user.id
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
