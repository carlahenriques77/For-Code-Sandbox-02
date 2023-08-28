import React from "react";
import "./LikeContainer.scss";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const LikeContainer = ({ currentPhotoProp, authCurrentUserProp, likeOnClickProp }) => {
  return (
    <div className="like">
      {currentPhotoProp.photoLikesArray && authCurrentUserProp && (
        <>{currentPhotoProp.photoLikesArray.includes(authCurrentUserProp._id) ? (
            <BsHeartFill />
        ) : (
            <BsHeart onClick={() => likeOnClickProp(currentPhotoProp)} />
        )}
        
        <p>{currentPhotoProp.photoLikesArray.length} like(s)</p>
        </>
      )}
    </div>
  );
};

export default LikeContainer;
