import React from "react";
import "./Home.scss";
import LikeContainer from "../../Components/LikeContainer/LikeContainer";
import PhotoItem from "../../Components/PhotoItem/PhotoItem";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearPhotoMessage,
  getAllExistingPhotosAsyncThunk,
  likeAnPhotoAsyncThunk,
} from "../../backend-utils/slices/photoSlice";

const Home = () => {
  const homeDispatch = useDispatch();

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

  // Load All for the Homepage Photos
  useEffect(() => {
    homeDispatch(getAllExistingPhotosAsyncThunk());
  }, [homeDispatch]);

  const CUSTOMIZABLE_SET_TIMEOUT_TIMER_2000 = 2000;

  // Like a Photo from the Homepage On Click
  const likeOnClick = (mapPhoto) => {
    homeDispatch(likeAnPhotoAsyncThunk(mapPhoto._id));

    setTimeout(() => {
      homeDispatch(clearPhotoMessage());
    }, CUSTOMIZABLE_SET_TIMEOUT_TIMER_2000);
  };

  if (photoIsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div id="home">
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
      <h2 className="no-photos">
        There is not Photo published yet...{" "}
        <Link to={`/users/${authSliceCurrentUser._id}`}>
          Be the first to Post something
        </Link>
      </h2>
      )}
    </div>
  );
};

export default Home;
