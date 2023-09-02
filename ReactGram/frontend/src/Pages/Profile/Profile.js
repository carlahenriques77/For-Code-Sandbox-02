import React from "react";
import "./Profile.scss";
import { uploads } from "../../backend-utils/utils/config";
import Message from "../../Components/Message/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearUserMessage,
  getUserDetailsByIDAsyncThunk,
} from "../../backend-utils/slices/userSlice";
import useFormManagement from "../../hooks/useFormManagement";
import {
  clearPhotoMessage,
  publishPhotoAsyncThunk,
  getUserPhotosByUserIdAsyncThunk,
  deletePhotoAsyncThunk,
  updatePhotoAsyncThunk,
} from "../../backend-utils/slices/photoSlice";

const Profile = () => {
  const {
    // States
    photoTitle,
    photoImage,
    editPhotoTitle,

    // setStates
    setPhotoTitle,
    setPhotoImage,
    setEditPhotoTitle,

    // Basic OnChange
    photoTitleBasicOnChange,
    photoImageBasicOnChange,
    editPhotoTitleBasicOnChange,
  } = useFormManagement();

  const { pathgetUserByID } = useParams();

  const profileDispatch = useDispatch();

  const { currentUser: userSliceCurrentUser, isLoading: userIsLoading } =
    useSelector((state) => state.userReducer);

  const { currentUser: authSliceCurrentUser } = useSelector(
    (state) => state.authReducer
  );

  const {
    currentPhoto,
    allPhotosArray,
    isLoading: photoIsLoading,
    hasError: photoHasErrorMessage,
    successPhotoMessage,
  } = useSelector((state) => state.photoReducer);

  const handleFileOnChange = (changeEvent) => {
    // Image Preview
    const selectedImage = changeEvent.target.files[0];

    setPhotoImage(selectedImage);
  };

  const CUSTOMIZABLE_SET_TIMEOUT_TIMER_2000 = 2000;

  const photoPostFormSubmit = (handleEvent) => {
    handleEvent.preventDefault();

    const photoDetails = {
      photoTitle,
      photoImage,
    };

    // Build Form Data
    const publishFormData = new FormData();

    const objectKeysPhotoFormData = Object.keys(photoDetails).forEach(
      (objectKey) => {
        publishFormData.append(objectKey, photoDetails[objectKey]);
      }
    );

    publishFormData.append("currentPhoto", objectKeysPhotoFormData);

    profileDispatch(publishPhotoAsyncThunk(publishFormData));

    setPhotoTitle("");

    setTimeout(() => {
      profileDispatch(clearPhotoMessage());
    }, CUSTOMIZABLE_SET_TIMEOUT_TIMER_2000);
  };

  const [editPhotoID, setEditPhotoID] = useState("");
  const [editPhotoImage, setEditPhotoImage] = useState("");

  // New Form and Edit Form References
  const newPhotoFormRef = useRef();
  const editPhotoFormRef = useRef();

  // ChatGPT - Scroll into View when the user Clicks on the Edit Photo Button Reference
  const editPhotoScrollOnClickRef = useRef();

  // Load User Data and the User Photos
  useEffect(() => {
    profileDispatch(getUserDetailsByIDAsyncThunk(pathgetUserByID));
    profileDispatch(getUserPhotosByUserIdAsyncThunk(pathgetUserByID));
  }, [profileDispatch, pathgetUserByID]);

  // Delete a Photo
  const deletePhotoOnClick = (pathDeletePhotoID) => {
    profileDispatch(deletePhotoAsyncThunk(pathDeletePhotoID));

    setTimeout(() => {
      profileDispatch(clearPhotoMessage());
    }, CUSTOMIZABLE_SET_TIMEOUT_TIMER_2000);
  };

  // Show or Hide Forms
  const hideOrShowEditFormOnClick = (handleEvent) => {
    newPhotoFormRef.current.classList.toggle("hide");
    editPhotoFormRef.current.classList.toggle("hide");
  };

  const photoUpdateFormSubmit = (handleEvent) => {
    handleEvent.preventDefault();

    const editPhotoDetails = {
      editPhotoTitleDataFrontend: editPhotoTitle,
      bodyUpdatePhotoID: editPhotoID,
    };

    profileDispatch(updatePhotoAsyncThunk(editPhotoDetails));

    setTimeout(() => {
      profileDispatch(clearPhotoMessage());

      profileDispatch(getUserPhotosByUserIdAsyncThunk(pathgetUserByID));
    }, CUSTOMIZABLE_SET_TIMEOUT_TIMER_2000);
  };

  const cancelEditOnClick = (handleEvent) => {
    hideOrShowEditFormOnClick();
  };

  // Display Photo Edit Form
  const showPhotoEditScreenOnClick = (handleEvent) => {
    if (editPhotoFormRef.current.classList.contains("hide")) {
      hideOrShowEditFormOnClick();
    }

    setEditPhotoID(handleEvent._id);
    setEditPhotoTitle(handleEvent.photoTitle);
    setEditPhotoImage(handleEvent.photoImage);

    // Scroll to the Chosen Element
    editPhotoScrollOnClickRef.current.scrollIntoView({ behavior: "smooth" });
  };

  if (userIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {userSliceCurrentUser.userProfileImage && (
          <>
            <img
              src={`${uploads}/users/${userSliceCurrentUser.userProfileImage}`}
              alt={userSliceCurrentUser.userDisplayName}
            />
          </>
        )}

        <div className="profile-description">
          <h2>{userSliceCurrentUser.userDisplayName}</h2>

          <p>{userSliceCurrentUser.userBio}</p>
        </div>
      </div>

      {pathgetUserByID === authSliceCurrentUser.user_ID && (
        <>
          <div className="new-photo" ref={newPhotoFormRef}>
            <h3>Share one of your Moments:</h3>

            <form onSubmit={photoPostFormSubmit} action="">
              <label htmlFor="">
                <span>Photo Title:</span>

                <input
                  type="text"
                  placeholder="Title"
                  value={photoTitle || ""}
                  onChange={photoTitleBasicOnChange}
                />
              </label>

              <label htmlFor="">
                <span>Photo Image:</span>

                <input type="file" onChange={handleFileOnChange} />
              </label>

              {!photoIsLoading && <input type="submit" value="Update" />}

              {photoIsLoading && (
                <input type="submit" value="Loading..." disabled />
              )}
            </form>
          </div>

          <div className="edit-photo hide" ref={editPhotoFormRef}>
            <p ref={editPhotoScrollOnClickRef}>Editing:</p>

            {editPhotoImage && (
              <img
                src={`${uploads}/photos/${editPhotoImage}`}
                alt={editPhotoTitle}
              />
            )}

            <form onSubmit={photoUpdateFormSubmit} action="">
              <input
                type="text"
                placeholder="Insert the New Title"
                value={editPhotoTitle || ""}
                onChange={editPhotoTitleBasicOnChange}
              />

              <input type="submit" value="Submit" />

              <button
                className="cancel-btn"
                type="button"
                onClick={cancelEditOnClick}
              >
                Cancel
              </button>
            </form>
          </div>

          {photoHasErrorMessage && (
            <Message
              theMsg={photoHasErrorMessage}
              theType="errorMessageClassStyle"
            />
          )}

          {successPhotoMessage && (
            <Message
              theMsg={successPhotoMessage}
              theType="successMessageClassStyle"
            />
          )}
        </>
      )}

      <div className="user-photos">
        <h2>Photos Published by You:</h2>

        <div className="photos-container">
          {allPhotosArray &&
            allPhotosArray.map((mapPhoto) => (
              <div className="photo" key={mapPhoto._id}>
                {mapPhoto.photoImage && (
                  <img
                    src={`${uploads}/photos/${mapPhoto.photoImage}`}
                    alt={mapPhoto.photoTitle}
                  />
                )}

                {pathgetUserByID === authSliceCurrentUser.user_ID ? (
                  <div className="actions">
                    <Link to={`/photos/${mapPhoto._id}`}>
                      <BsFillEyeFill />
                    </Link>

                    <BsPencilFill
                      onClick={() => showPhotoEditScreenOnClick(mapPhoto)}
                    />

                    <BsXLg
                      onClick={() => {
                        deletePhotoOnClick(mapPhoto._id);
                      }}
                    />
                  </div>
                ) : (
                  <Link className="btn" to={`/photos/${mapPhoto._id}`}>
                    View
                  </Link>
                )}
              </div>
            ))}

          {allPhotosArray.length === 0 && (
            <p>You don't have any Photos published...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
