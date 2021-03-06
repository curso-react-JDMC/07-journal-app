import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startGoogleLogin, startLoginEmail } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formValues, handleInputChange] = useForm({
    email: "correo@mail.com",
    password: "123456",
  });
  const { email, password } = formValues;
  const state = useSelector( state => state );


  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLoginEmail(email, password));
  };
  
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  }

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin} className="animate__animated animate__fadeIn animate__faster">
        <input
          className="auth__input"
          autoComplete="off"
          type="text"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          autoComplete="off"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary btn-block" type="submit" disabled={ state.ui.loading }>
          Login
        </button>
        <div className="auth__social-networks">
          <p>Login with social network</p>
          <div className="google-btn" onClick={ handleGoogleLogin }>
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link to="/auth/register" className="link">
          Create new account
        </Link>
      </form>
    </>
  );
};
