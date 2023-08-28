import React from "react";
import "./Photo.scss";
import { uploads } from "../../backend-utils/utils/config";
import Message from "../../Components/Message/Message";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPhotoUsingPhotoIdAsyncThunk } from "../../backend-utils/slices/photoSlice";
import PhotoItem from "../../Components/PhotoItem/PhotoItem";
import LikeContainer from "../../Components/LikeContainer/LikeContainer";

const Photo = () => {
  const { pathFindPhotoID } = useParams();

  const photoDispatch = useDispatch();

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

  // Load Photo Data
  useEffect(() => {
    photoDispatch(getPhotoUsingPhotoIdAsyncThunk(pathFindPhotoID));
  }, [photoDispatch, pathFindPhotoID]);

  const likeOnClick = (handleEvent) => {
    
  };

  // Like and Comment Functions
  if (photoIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div id="photo">
      <PhotoItem currentPhotoProp={currentPhoto} />
      <LikeContainer
        currentPhotoProp={currentPhoto}
        authCurrentUserProp={authSliceCurrentUser}
        likeOnClickProp={likeOnClick}
      />
    </div>
  );
};

export default Photo;
