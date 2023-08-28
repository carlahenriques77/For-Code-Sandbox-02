import React from "react";
import "./Auth.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFormManagement from "../../hooks/useFormManagement";
import {
  registrationAsyncThunk,
  resetAuth,
} from "../../backend-utils/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Message from "../../Components/Message/Message";

const Register = () => {
  const {
    // States
    userDisplayName,
    userEmail,
    userPassword,
    userConfirmPassword,

    // setStates
    setUserDisplayName,
    setUserEmail,
    setUserPassword,
    setUserConfirmPassword,

    // Basic OnChange
    userDisplayNameBasicOnChange,
    userEmailBasicOnChange,
    userPasswordBasicOnChange,
    userConfirmPasswordBasicOnChange,
  } = useFormManagement();

  const registrationDispatch = useDispatch();

  const { isLoading: authIsLoading, hasError: authHasError } = useSelector(
    (state) => state.authReducer
  );

  const registerFormSubmit = (handleEvent) => {
    handleEvent.preventDefault();

    const userDetails = {
      userDisplayName,
      userPassword,
      userEmail,
      userConfirmPassword,
    };

    console.log(userDetails);

    registrationDispatch(registrationAsyncThunk(userDetails));
  };

  // Clean all Auth States
  useEffect(() => {
    registrationDispatch(resetAuth());
  }, [registrationDispatch]);

  return (
    <div id="register">
      <h2>ReactGram</h2>

      <p className="subtitle">
        Sign Up to see Photos and Videos from your Friends.
      </p>

      <form onSubmit={registerFormSubmit} action="">
        <input
          type="text"
          placeholder="Username"
          value={userDisplayName || ""}
          onChange={userDisplayNameBasicOnChange}
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          value={userConfirmPassword || ""}
          onChange={userConfirmPasswordBasicOnChange}
        />

        {!authIsLoading && <input type="submit" value="Sign up" />}
        {authIsLoading && <input type="submit" value="Loading..." disabled />}

        {authHasError && (
          <Message theMsg={authHasError} theType="errorMessageClassStyle" />
        )}
      </form>

      <p>
        Already have an Account? <Link to="/login">Click Here</Link>
      </p>
    </div>
  );
};

export default Register;
