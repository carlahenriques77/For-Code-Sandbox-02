import React from "react";
import "./Auth.scss";
import { Link } from "react-router-dom";
import Message from "../../Components/Message/Message";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFormManagement from "../../hooks/useFormManagement";
import {
  loginAsyncThunk,
  resetAuth,
} from "../../backend-utils/slices/authSlice";

const Login = () => {
  const {
    // States
    userEmail,
    userPassword,

    // setStates
    setUserEmail,
    setUserPassword,

    // Basic OnChange
    userEmailBasicOnChange,
    userPasswordBasicOnChange,
  } = useFormManagement();

  const { isLoading: authIsLoading, hasError: authHasError } = useSelector(
    (state) => state.authReducer
  );

  const loginDispatch = useDispatch();

  const loginFormSubmit = (handleEvent) => {
    handleEvent.preventDefault();

    const userDetails = {
      userPassword,
      userEmail,
    };

    console.log(userDetails);

    loginDispatch(loginAsyncThunk(userDetails));
  };

  // Clean all Auth States
  useEffect(() => {
    loginDispatch(resetAuth());
  }, [loginDispatch]);

  return (
    <div id="login">
      <h2>ReactGram</h2>

      <p className="subtitle">Sign in to see what new thins are happening.</p>

      <form onSubmit={loginFormSubmit} action="">
        <input
          type="email"
          placeholder="E-Mail"
          value={userEmail || ""}
          onChange={userEmailBasicOnChange}
        />

        <input
          type="password"
          placeholder="Password"
          value={userPassword || ""}
          onChange={userPasswordBasicOnChange}
        />

        {!authIsLoading && <input type="submit" value="Log in" />}
        {authIsLoading && <input type="submit" value="Loading..." disabled />}

        {authHasError && (
          <Message theMsg={authHasError} theType="errorMessageClassStyle" />
        )}
      </form>

      <p>
        Don't have an Account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
