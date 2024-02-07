import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as authorActions from '../../redux/authors'
import { useParams } from "react-router-dom";
import "./FormModals.css";

function UpdateAuthorFormModal({ defaultName, defaultBiography }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(defaultName);
  const [biography, setBiography] = useState(defaultBiography);
  const sessionUser = useSelector((state) => state.session.user);
  const { authorId } = useParams();
  // const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const updateAuthor = (e, authorId) => {
    e.preventDefault()
    dispatch(authorActions.fetchUpdateAuthor(authorId, {name, biography}))
    closeModal()
  }

  return (
    <>
      <h2 id="form-label">Update Author</h2>
      <form className="form" onSubmit={(e) => updateAuthor(e, authorId)}>
        <label className="su-label">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="textarea"
            placeholder={name}
            required
          />
        </label>
        <label className="su-label">
          Biography
          <textarea
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            className="textarea"
            placeholder={biography}
            required
          />
        </label>
        <button className="button" type="submit">update</button>
      </form>
    </>
  );
}

export default UpdateAuthorFormModal;
