import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import * as authorActions from '../../redux/authors'
import './FormModals.css'

function AuthorFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [biography, setBiography] = useState("");
  // const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const curr_user = useSelector(state => state.session.user)

  const sendPost = async (e) => {
    e.preventDefault()
    const response = await dispatch(authorActions.fetchCreateAuthor({
      name,
      biography,
      'posted_by': curr_user.id
    }))
    closeModal()
    navigate(`/authors/${response.id}`)
  }

  return (
    <>
      <h2 id="form-label">Create an Author</h2>
      <form className="form" onSubmit={sendPost}>
        <label className="su-label">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="name"
            required
          />
        </label>
        <label className="su-label">
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            className="textarea"
            placeholder="Biography"
            required
          />
        </label>
        <button className="button" type="submit">create</button>
      </form>
    </>
  );
}

export default AuthorFormModal;
