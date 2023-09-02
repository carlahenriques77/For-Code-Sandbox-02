import React from "react";
import "./Photo.scss";
import { uploads } from "../../backend-utils/utils/config";
import Message from "../../Components/Message/Message";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPhotoUsingPhotoIdAsyncThunk,
  likeAnPhotoAsyncThunk,
  commentOnPhotoAsyncThunk,
  clearPhotoMessage,
} from "../../backend-utils/slices/photoSlice";
import PhotoItem from "../../Components/PhotoItem/PhotoItem";
import LikeContainer from "../../Components/LikeContainer/LikeContainer";
import useFormManagement from "../../hooks/useFormManagement";

const Photo = () => {
  const {
    // States
    photoCommentText,

    // setStates
    setPhotoCommentText,

    // Basic OnChange
    photoCommentTextBasicOnChange,
  } = useFormManagement();

  const { pathFindPhotoID } = useParams();

  const photoDispatch = useDispatch();

  const { currentUser: authSliceCurrentUser } = useSelector(
    (state) => state.authReducer
  );

  const {
    currentPhoto,
    isLoading: photoIsLoading,
    hasError: photoHasErrorMessage,
    successPhotoMessage,
  } = useSelector((state) => state.photoReducer);

  // Load Photo Data
  useEffect(() => {
    photoDispatch(getPhotoUsingPhotoIdAsyncThunk(pathFindPhotoID));
  }, [photoDispatch, pathFindPhotoID]);

  const CUSTOMIZABLE_SET_TIMEOUT_currentTimer_2000 = 2000;

  const likeOnClick = (handleEvent) => {
    photoDispatch(likeAnPhotoAsyncThunk(currentPhoto._id));

    setTimeout(() => {
      photoDispatch(clearPhotoMessage());
    }, CUSTOMIZABLE_SET_TIMEOUT_currentTimer_2000);
  };

  const photoCommentFormSubmit = (handleEvent) => {
    handleEvent.preventDefault();

    const commentData = {
      commentTextFrontend: photoCommentText,
      bodyPhotoCommentID: currentPhoto._id,
    };

    photoDispatch(commentOnPhotoAsyncThunk(commentData));

    setPhotoCommentText("");

    setTimeout(() => {
      photoDispatch(clearPhotoMessage());
    }, CUSTOMIZABLE_SET_TIMEOUT_currentTimer_2000);
  };

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

      <div className="message-container">
        {/* Empty, for now. */}
      </div>

      <div className="comments">
        {currentPhoto.photoCommentsArray && currentPhoto.photoCommentsArray && (
          <>
            <h3>Comments: ({currentPhoto.photoCommentsArray.length})</h3>

            <form onSubmit={photoCommentFormSubmit} action="">
              <input
                type="text"
                placeholder="Add a comment..."
                value={photoCommentText || ""}
                onChange={photoCommentTextBasicOnChange}
              />

              <input type="submit" value="Submit" />
            </form>

            {currentPhoto.photoCommentsArray.length === 0 && (
              <p>No comments. Be the first to Comment something</p>
            )}

            {currentPhoto.photoCommentsArray &&
              currentPhoto.photoCommentsArray.map((mapItem) => (
                <div className="comment" key={mapItem.thePhotoComment}>
                  <div className="author">
                    {mapItem.commentUserProfileImage && (
                      <img
                        src={`${uploads}/users/${mapItem.commentUserProfileImage}`}
                        alt={mapItem.commentUserDisplayName}
                      />
                    )}

                    {console.log("mapItem 04: ", mapItem)}

                    <Link to={`/users/${mapItem.commentUser_ID}`}>
                      <p>{mapItem.commentUserDisplayName}</p>
                    </Link>
                  </div>

                  <p>{mapItem.thePhotoComment}</p>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
