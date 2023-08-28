import React from "react";
import "./PhotoItem.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { uploads } from "../../backend-utils/utils/config";

const PhotoItem = ({ currentPhotoProp }) => {
  return (
    <div className="photo-item">
      {currentPhotoProp.photoImage && (
        <img
          src={`${uploads}/photos/${currentPhotoProp.photoImage}`}
          alt={currentPhotoProp.photoTitle}
        />
      )}

      <h2>{currentPhotoProp.photoTitle}</h2>

      <p className="photo-author">
        Published By:{" "}
        <Link to={`/users/${currentPhotoProp.photoCreator_ID}`}>
          {currentPhotoProp.photoCreatorName}
        </Link>
      </p>
    </div>
  );
};

export default PhotoItem;
