import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const handleDemoSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      thunkLogin({
        email: "demo@aa.io",
        password: "password",
      })
    );
    closeModal()
  }

  return (
    <div id='outer-form-container'>
      <h1 id='log-in-label'>Log In</h1>
      <form onSubmit={handleSubmit} id='form-container'>
        <label className='lfm-label'>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <p className="error-message">{errors.email && errors.email}</p>
        <label className='lfm-label'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p className="error-message">{errors.password && errors.password}</p>
        <button type="submit" className='lfm-button'>Log In</button>
        <button onClick={handleDemoSubmit} className="lfm-button" type="submit">Demo user</button>
        <span className="google-auth-div">or</span>
        <a href={`${window.origin}/api/auth/oauth_login`} className="google-auth"><button className="button" type="button">Sign in with Google</button></a>
      </form>
    </div>
  );
}

export default LoginFormModal;
