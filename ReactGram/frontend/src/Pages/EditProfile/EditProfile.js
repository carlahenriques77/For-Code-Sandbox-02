import React from "react";
import "./EditProfile.scss";
import useFormManagement from "../../hooks/useFormManagement";
import { uploads } from "../../backend-utils/utils/config";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  profileAsyncThunk,
  clearUserMessage,
  updateProfileAsyncThunk,
} from "../../backend-utils/slices/userSlice";
import Message from "../../Components/Message/Message";

const EditProfile = () => {
  const {
    // States
    userDisplayName,
    userEmail,
    userPassword,
    userConfirmPassword,
    userProfileImage,
    userBio,
    userPreviewImage,

    // setStates
    setUserDisplayName,
    setUserEmail,
    setUserPassword,
    setUserConfirmPassword,
    setUserProfileImage,
    setUserBio,
    setUserPreviewImage,

    // Basic OnChange
    userDisplayNameBasicOnChange,
    userEmailBasicOnChange,
    userPasswordBasicOnChange,
    userConfirmPasswordBasicOnChange,
    userProfileImageBasicOnChange,
    userBioBasicOnChange,
    userPreviewImageBasicOnChange,
  } = useFormManagement();

  // Weak Validation. The Multer doesn't Allow you to do it in the Backend, so this will be our Provisory Solution.
  const [provisoryValidation, setProvisoryValidation] = useState("");

  const editProfileDispatch = useDispatch();

  const {
    currentUser: userSliceCurrentUser,
    successMessage: userSuccessMessage,
    isLoading: userIsLoading,
    hasError: userHasError,
  } = useSelector((state) => state.userReducer);

  // Load User Data
  useEffect(() => {
    editProfileDispatch(profileAsyncThunk());
  }, [editProfileDispatch]);

  // Fill Form with User Data
  useEffect(() => {
    if (userSliceCurrentUser) {
      setUserDisplayName(userSliceCurrentUser.userDisplayName);
      setUserEmail(userSliceCurrentUser.userEmail);
      setUserPassword(userSliceCurrentUser.userPassword);
      setUserBio(userSliceCurrentUser.userBio);
      setUserProfileImage(userSliceCurrentUser.profileImage);
    }
  }, [
    userSliceCurrentUser,
    setUserDisplayName,
    setUserEmail,
    setUserPassword,
    setUserBio,
    setUserProfileImage,
  ]);

  const editProfileFormSubmit = async (handleEvent) => {
    handleEvent.preventDefault();

    // Gather User Data from States
    const userFormData = {
      userDisplayName,
    };

    if (userProfileImage) {
      userFormData.userProfileImage = userProfileImage;
    }

    if (userBio) {
      userFormData.userBio = userBio;
    }

    if (userPassword) {
      userFormData.userPassword = userPassword;
    }

    if (!userDisplayName) {
      setProvisoryValidation("Display name is required");
      return; // Stop the form submission
    } else if (userDisplayName && userDisplayName.length < 3) {
      setProvisoryValidation("Display name must be at least 3 characters");
      return; // Stop the form submission
    }

    if (userPassword && userPassword.length < 5) {
      setProvisoryValidation("Password must be at least 5 characters");
      return; // Stop the form submission
    }

    // Checkes if Passwords are the same
    if (
      userPassword &&
      userPassword !== userConfirmPassword &&
      userConfirmPassword
    ) {
      setProvisoryValidation("Passwords do not match.");
      return; // Stop the form submission
    }

    // Build Form Data
    const updateUserFormData = new FormData();

    const objectKeysUserFormData = Object.keys(userFormData).forEach(
      (objectKey) => {
        updateUserFormData.append(objectKey, userFormData[objectKey]);
      }
    ); // No "{}" Brackets were done here. Maybe it was an possible Mistake?

    updateUserFormData.append("userSliceCurrentUser", objectKeysUserFormData);
    // Could the Error be here? userSliceCurrentUser or itemUser...?

    await editProfileDispatch(updateProfileAsyncThunk(updateUserFormData));
    // Error Here [Exactly like Before], we were passing the "objectKeysUserFormData" here, instead of the updateUserFormData

    // Clear password field after submission so the User doesn't see the Hash Password...
    setUserPassword("");

    setTimeout(() => {
      editProfileDispatch(clearUserMessage());
    }, 2000);
  };

  const handleFileOnChange = (changeEvent) => {
    // Image Preview
    const selectedImage = changeEvent.target.files[0];

    setUserPreviewImage(selectedImage);

    // Update Image State
    setUserProfileImage(selectedImage);
  };

  return (
    <div id="edit-profile">
      <h2>Edit your Information {userSuccessMessage}</h2>

      <p className="subtitle">
        Insert an Profile Image and tell us more about you...
      </p>

      {(userSliceCurrentUser.userProfileImage || userPreviewImage) && (
        <img
          className="profile-image"
          src={
            userPreviewImage
              ? URL.createObjectURL(userPreviewImage)
              : `${uploads}/users/${userSliceCurrentUser.userProfileImage}`
          }
          alt={userSliceCurrentUser.userDisplayName}
        />
      )}

      {/* User Profile Image Preview */}
      <form onSubmit={editProfileFormSubmit} action="">
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
          disabled
        />

        <label htmlFor="">
          <span>Profile Image:</span>

          <input type="file" onChange={handleFileOnChange} name="" id="" />
        </label>

        <label htmlFor="">
          <span>Bio:</span>

          <input
            type="text"
            placeholder="Profile Description"
            value={userBio || ""}
            onChange={userBioBasicOnChange}
            name=""
            id=""
          />
        </label>

        <label htmlFor="">
          <span>Change Password?</span>

          <input
            type="password"
            placeholder="Password"
            value={userPassword || ""}
            onChange={userPasswordBasicOnChange}
          />
        </label>

        <label htmlFor="">
          <span>Confirm Password:</span>

          <input
            type="password"
            placeholder="Confirm Password"
            value={userConfirmPassword || ""}
            onChange={userConfirmPasswordBasicOnChange}
          />
        </label>

        {!userIsLoading && <input type="submit" value="Update" />}
        {userIsLoading && <input type="submit" value="Loading..." disabled />}

        {provisoryValidation && (
          <Message
            theMsg={provisoryValidation}
            theType="errorMessageClassStyle"
          />
        )}

        {userHasError && (
          <Message theMsg={userHasError} theType="errorMessageClassStyle" />
        )}

        {userSuccessMessage && (
          <Message theMsg={userSuccessMessage} theType="successMessageClassStyle" />
        )}
      </form>
    </div>
  );
};

export default EditProfile;
