import React from "react";
import "./Navbar.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillCameraFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { useState } from "react";
import { useAuthenticationStatus } from "../../hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import {
  logoutAsyncThunk,
  resetAuth,
} from "../../backend-utils/slices/authSlice";

const Navbar = () => {
  const { isAuthenticated } = useAuthenticationStatus();

  const { currentUser } = useSelector((state) => state.authReducer);

  const [querySearchInput, setQuerySearchInput] = useState("");

  const navbarNavigate = useNavigate();

  const navbarDispatch = useDispatch();

  const handleLogoutOnClick = (handleEvent) => {
    navbarDispatch(logoutAsyncThunk());
    navbarDispatch(resetAuth());

    navbarNavigate("/login");
  };

  const searchFormSubmit = (handleEvent) => {
    handleEvent.preventDefault();

    if (querySearchInput) {
      return navbarNavigate(`/search?searchQuery=${querySearchInput}`);
    }
  };

  const navQueryBasicOnChange = (changeEvent) => {
    setQuerySearchInput(changeEvent.target.value);
  };

  return (
    <div id="nav">
      <Link to="/">ReactGram</Link>

      <form id="search-form" onSubmit={searchFormSubmit} action="">
        <BsSearch />
        <input type="text" onChange={navQueryBasicOnChange} name="" id="" />
      </form>

      <ul id="nav-links">
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>

            {currentUser && (
              <li>
                <NavLink to={`/users/${currentUser.user_ID}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}

            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </li>

            <li>
              <span onClick={handleLogoutOnClick}>Logout</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>

            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
