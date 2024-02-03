import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as commentActions from '../../redux/comments'
import { useParams } from "react-router-dom";
import "./FormModals.css";

function UpdateCommentFormModal({ commentId, defaultBody }) {
  const dispatch = useDispatch();
  const [body, setBody] = useState(defaultBody);
  const sessionUser = useSelector((state) => state.session.user)
  // const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

    const updateComment = (e, commentId) => {
      e.preventDefault()
      dispatch(commentActions.fetchUpdateComment(commentId, {body}))
      closeModal()
  }

  return (
    <>
      <h2>Update comment</h2>
      <form className="form" onSubmit={(e) => updateComment(e, commentId)}>
        <label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="textarea"
            placeholder={body}
            required
          />
        </label>
        <button className="button" type="submit">update</button>
      </form>
    </>
  );
}

export default UpdateCommentFormModal;
