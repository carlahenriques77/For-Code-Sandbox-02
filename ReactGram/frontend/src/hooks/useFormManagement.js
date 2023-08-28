import { useState } from "react";

const useFormManagement = () => {
  // States: Login / Register / Edit Profile
  const [userDisplayName, setUserDisplayName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Exclusive States: Register / Edit Profile
  const [userConfirmPassword, setUserConfirmPassword] = useState("");

  // States: Profile / EditProfile
  const [userProfileImage, setUserProfileImage] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userPreviewImage, setUserPreviewImage] = useState("");

  // States: Profile Photo Post
  const [photoImage, setPhotoImage] = useState("");
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoCommentsArray, setPhotoComments] = useState([]);

  // States: Profile Photo Edit
  const [editPhotoTitle, setEditPhotoTitle] = useState("");

  // Basic OnChange: Login / Register
  const userDisplayNameBasicOnChange = (changeEvent) => {
    setUserDisplayName(changeEvent.target.value);
  };
  const userEmailBasicOnChange = (changeEvent) => {
    setUserEmail(changeEvent.target.value);
  };
  const userPasswordBasicOnChange = (changeEvent) => {
    setUserPassword(changeEvent.target.value);
  };

  // Exclusive OnChange: Register / Edit Profile
  const userConfirmPasswordBasicOnChange = (changeEvent) => {
    setUserConfirmPassword(changeEvent.target.value);
  };

  // Basic OnChange: EditProfile
  const userProfileImageBasicOnChange = (changeEvent) => {
    setUserProfileImage(changeEvent.target.value);
  };
  const userBioBasicOnChange = (changeEvent) => {
    setUserBio(changeEvent.target.value);
  };
  const userPreviewImageBasicOnChange = (changeEvent) => {
    setUserPreviewImage(changeEvent.target.value);
  };

  // Basic OnChange: Profile Photo Post
  const photoImageBasicOnChange = (changeEvent) => {
    setPhotoImage(changeEvent.target.value);
  };
  const photoTitleBasicOnChange = (changeEvent) => {
    setPhotoTitle(changeEvent.target.value);
  };

  // Basic OnChange: Profile Photo Edit
  const editPhotoTitleBasicOnChange = (changeEvent) => {
    setEditPhotoTitle(changeEvent.target.value);
  };

  return {
    // States
    userDisplayName,
    userEmail,
    userPassword,
    userConfirmPassword,
    userProfileImage,
    userBio,
    userPreviewImage,
    photoImage,
    photoTitle,
    photoCommentsArray,
    editPhotoTitle,

    // setStates
    setUserDisplayName,
    setUserEmail,
    setUserPassword,
    setUserConfirmPassword,
    setUserProfileImage,
    setUserBio,
    setUserPreviewImage,
    setPhotoImage,
    setPhotoTitle,
    setPhotoComments,
    setEditPhotoTitle,

    // Basic OnChange
    userDisplayNameBasicOnChange,
    userEmailBasicOnChange,
    userPasswordBasicOnChange,
    userConfirmPasswordBasicOnChange,
    userProfileImageBasicOnChange,
    userBioBasicOnChange,
    userPreviewImageBasicOnChange,
    photoImageBasicOnChange,
    photoTitleBasicOnChange,
    editPhotoTitleBasicOnChange,
  };
};

export default useFormManagement;
