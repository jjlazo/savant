import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const renderErrors = (errors = []) => errors?.map(e => <p key={e} className="error-message">{e}</p>);

  return (
    <div id="outer-form-container-su">
      <h1 id='sign-up-label'>Sign Up</h1>
      <div className="error-messages">{renderErrors(errors.server)}</div>
      <form onSubmit={handleSubmit}>
        <label className="su-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="error-messages">{renderErrors(errors.email)}</div>
        <label className="su-label">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <div className="error-messages">{renderErrors(errors.username)}</div>
        <label className="su-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="error-messages">{renderErrors(errors.password)}</div>
        <label className="su-label">
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="error-messages">{renderErrors(errors.confirmPassword)}</div>
        <button type="submit" id="su-button">Sign Up</button>
        <span className="google-auth-div">or</span>
        <a href={`${window.origin}/api/auth/oauth_login`} className="google-auth"><button className="button" type="button">Sign up with Google</button></a>
      </form>
    </div>
  );
}

export default SignupFormModal;
