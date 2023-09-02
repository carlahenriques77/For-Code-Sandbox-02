import React from "react";
import "./LikeContainer.scss";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const LikeContainer = ({
  currentPhotoProp,
  authCurrentUserProp,
  likeOnClickProp,
}) => {
  return (
    <div className="like">
      {currentPhotoProp.photoLikesArray && authCurrentUserProp && (
        <>
          {currentPhotoProp.photoLikesArray.includes(
            authCurrentUserProp.user_ID
          ) ? (
            <>
              <BsHeartFill onClick={() => likeOnClickProp(currentPhotoProp)} />
            </>
          ) : (
            <>
              <BsHeart onClick={() => likeOnClickProp(currentPhotoProp)} />
            </>
          )}

          <p>
            {currentPhotoProp.photoLikesArray.length}{" "}
            {currentPhotoProp.photoLikesArray.length <= 1 ? "Like" : "Likes"}
          </p>
        </>
      )}
    </div>
  );
};

export default LikeContainer;
