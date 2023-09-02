import React from "react";
import "./Search.scss";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import LikeContainer from "../../Components/LikeContainer/LikeContainer";
import PhotoItem from "../../Components/PhotoItem/PhotoItem";
import { useQuery } from "../../hooks/useQuery";
import {
  searchPhotosByTitleAsyncThunk,
  likeAnPhotoAsyncThunk,
  clearPhotoMessage,
} from "../../backend-utils/slices/photoSlice";

const Search = () => {
  const useQuerySearch = useQuery();

  const searchQueryGet = useQuerySearch.get("searchQuery");

  const searchDispatch = useDispatch();

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

  // Load the Photos from the Search Result
  useEffect(() => {
    searchDispatch(searchPhotosByTitleAsyncThunk(searchQueryGet));
  }, [searchDispatch, searchQueryGet]);

  const CUSTOMIZABLE_SET_TIMEOUT_currentTimer_2000 = 2000;

  // Allows the user to Like an Photo during the Search Page Results
  const likeOnClick = (mapPhoto) => {
    searchDispatch(likeAnPhotoAsyncThunk(mapPhoto._id));

    setTimeout(() => {
      searchDispatch(clearPhotoMessage());
    }, CUSTOMIZABLE_SET_TIMEOUT_currentTimer_2000);
  };

  if (photoIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div id="search">
      <h2>Showing Search Results for: {searchQueryGet}</h2>

      {allPhotosArray &&
        allPhotosArray.map((mapPhoto) => (
          <div key={mapPhoto._id}>
            <PhotoItem currentPhotoProp={mapPhoto} />

            <LikeContainer
              currentPhotoProp={mapPhoto}
              authCurrentUserProp={authSliceCurrentUser}
              likeOnClickProp={likeOnClick}
            />

            <Link className="btn" to={`/photos/${mapPhoto._id}`}>
              View
            </Link>
          </div>
        ))}

      {allPhotosArray.length === 0 && (
        <h2 className="no-photos">No Results Found...</h2>
      )}
    </div>
  );
};

export default Search;
