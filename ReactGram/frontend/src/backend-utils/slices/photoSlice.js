// Import necessary dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoServices";

// Define the initial state for the authentication slice
const initialState = {
  allPhotosArray: [], // Array to store all photos
  currentPhoto: {}, // Current selected photo
  hasError: false, // Indicates if an error occurred
  isSuccess: false, // Indicates if an action was successful
  isLoading: false, // Indicates if a request is in progress
  successPhotoMessage: null, // Success message for photo actions
};

// Thunk for the User to Publish his own photo
export const publishPhotoAsyncThunk = createAsyncThunk(
  "photoSlice/publishPhoto",
  async (publishedPhotoData, thunkAPI) => {
    const getCurrentUserToken =
      thunkAPI.getState().authReducer.currentUser.userToken;

    // Call the photo publishing service from the photo service
    const insertingPhotoResponse = await photoService.publishPhotoService(
      publishedPhotoData,
      getCurrentUserToken
    );

    // Check for errors in the response
    if (insertingPhotoResponse.formValidationErrors) {
      // Reject the promise with the first error
      return thunkAPI.rejectWithValue(
        insertingPhotoResponse.formValidationErrors[0]
      );
    }

    // Return the photo publishing response
    return insertingPhotoResponse;
  }
);

// Get Photos from Current User by his User ID
export const getUserPhotosByUserIdAsyncThunk = createAsyncThunk(
  "photoSlice/userPhotos",
  async (userID, thunkAPI) => {
    const getCurrentUserToken =
      thunkAPI.getState().authReducer.currentUser.userToken;

    // Call the service to get user photos by user ID
    const getPhotoResponse = await photoService.getUserPhotosByUserIdService(
      userID,
      getCurrentUserToken
    );

    // Return the photo response
    return getPhotoResponse;
  }
);

// Thunk to delete a user's own photo
export const deletePhotoAsyncThunk = createAsyncThunk(
  "photoSlice/deletePhoto",
  async (photoID, thunkAPI) => {
    const getCurrentUserToken =
      thunkAPI.getState().authReducer.currentUser.userToken;

    // Call the service to delete a user's photo
    const deletingPhotoResponse = await photoService.deleteUserPhotoService(
      photoID,
      getCurrentUserToken
    );

    // Check for errors in the response
    if (deletingPhotoResponse.formValidationErrors) {
      // Reject the promise with the first error
      return thunkAPI.rejectWithValue(
        deletingPhotoResponse.formValidationErrors[0]
      );
    }

    // Return the deletion response
    return deletingPhotoResponse;
  }
);

// Thunk to Update a user's own photo
export const updatePhotoAsyncThunk = createAsyncThunk(
  "photoSlice/updatePhoto",
  async (photoData, thunkAPI) => {
    const getCurrentUserToken =
      thunkAPI.getState().authReducer.currentUser.userToken;

    try {
      const { editPhotoTitleDataFrontend, bodyUpdatePhotoID } = photoData;

      // Call the service to update a user's photo
      const updatingPhotoResponse = await photoService.updatePhotoService(
        { photoTitle: editPhotoTitleDataFrontend },
        bodyUpdatePhotoID,
        getCurrentUserToken
      );

      // Check for errors in the response
      if (updatingPhotoResponse.formValidationErrors) {
        // Reject the promise with the first error
        return thunkAPI.rejectWithValue(
          updatingPhotoResponse.formValidationErrors[0]
        );
      }

      // Return the update response
      return updatingPhotoResponse;
    } catch (error) {
      console.log(error);
    }
  }
);

// Get a Photo using the Selected Photo ID
export const getPhotoUsingPhotoIdAsyncThunk = createAsyncThunk(
  "photoSlice/getSelectedPhoto",
  async (photoID, thunkAPI) => {
    const getCurrentUserToken =
      thunkAPI.getState().authReducer.currentUser.userToken;

    // Call the service to get a photo using photo ID
    const getPhotoResponse = await photoService.getPhotoUsingPhotoIdService(
      photoID,
      getCurrentUserToken
    );

    // Return the photo response
    return getPhotoResponse;
  }
);

// Like an Photo
export const likeAnPhotoAsyncThunk = createAsyncThunk(
  "photoSlice/likePhoto",
  async (userID, thunkAPI) => {
    const getCurrentUserToken =
      thunkAPI.getState().authReducer.currentUser.userToken;

    try {
      // Call the service to update a user's photo
      const likePhotoResponse = await photoService.likeAnPhotoService(
        userID,
        getCurrentUserToken
      );

      // Check for errors in the response
      if (likePhotoResponse.formValidationErrors) {
        // Reject the promise with the first error
        return thunkAPI.rejectWithValue(
          likePhotoResponse.formValidationErrors[0]
        );
      }

      // Return the update response
      return likePhotoResponse;
    } catch (error) {
      console.log(error);
    }
  }
);

// Add Comment to the Photo Comment Array, which will allow the User to Comment on a Photo, and us to Display it
export const commentOnPhotoAsyncThunk = createAsyncThunk(
  "photoSlice/commentPhoto",
  async (commentData, thunkAPI) => {
    const getCurrentUserToken =
      thunkAPI.getState().authReducer.currentUser.userToken;

    console.log("commentData 01:", commentData);

    try {
      const { commentTextFrontend, bodyPhotoCommentID } = commentData;

      // Call the service to update a user's photo
      const commentPhotoResponse = await photoService.commentOnPhotoService(
        bodyPhotoCommentID,
        { theUserCommentText: commentTextFrontend },
        getCurrentUserToken
      );

      // Check for errors in the response
      if (commentPhotoResponse.formValidationErrors) {
        // Reject the promise with the first error
        return thunkAPI.rejectWithValue(
          commentPhotoResponse.formValidationErrors[0]
        );
      }

      // Return the update response
      return commentPhotoResponse;
    } catch (error) {
      console.log(error);
    }
  }
);

// Get All Photos for the Homepage Mapping
export const getAllExistingPhotosAsyncThunk = createAsyncThunk(
  "photoSlice/getAllPhotos",
  async (_, thunkAPI) => {
    const getCurrentUserToken =
      thunkAPI.getState().authReducer.currentUser.userToken;

    // Call the service to get user photos by user ID
    const getAllPhotosResponse = await photoService.getAllExistingPhotosService(
      getCurrentUserToken
    );

    // Return the photo response
    return getAllPhotosResponse;
  }
);

// Search and find Photo by Title
export const searchPhotosByTitleAsyncThunk = createAsyncThunk(
  "photoSlice/searchPhoto",
  async (query, thunkAPI) => {
    const getCurrentUserToken =
      thunkAPI.getState().authReducer.currentUser.userToken;

    // Call the service to get a photo using photo ID
    const getPhotoResponse = await photoService.searchPhotoByTitleService(
      query,
      getCurrentUserToken
    );

    // Return the photo response
    return getPhotoResponse;
  }
);

// Success Messages
const SUCCESS_PHOTO_PUBLISH = "Photo Published Successfully";
const SUCCESS_PHOTO_UPDATE = "Photo Updated Successfully";
const SUCCESS_PHOTO_DELETE = "Photo Removed Successfully";
const SUCCESS_PHOTO_LIKE = "Photo Liked Successfully";

export const photoReducerSlice = createSlice({
  name: "photoReducer",
  initialState,
  reducers: {
    clearPhotoMessage: (resetState) => {
      resetState.successPhotoMessage = null;
    },
  },

  extraReducers: (photoBuilder) => {
    photoBuilder
      .addCase(publishPhotoAsyncThunk.pending, (photoState) => {
        photoState.isLoading = true; // Start loading
        photoState.hasError = false; // Clear error status
      })
      .addCase(publishPhotoAsyncThunk.fulfilled, (photoState, photoAction) => {
        photoState.isLoading = false; // Finish loading
        photoState.isSuccess = true; // Mark success
        photoState.hasError = null; // Clear error status
        photoState.currentPhoto = photoAction.payload; // Update current selected photo
        photoState.allPhotosArray.unshift(photoState.currentPhoto); // Add new photo to the beginning of the array
        photoState.successPhotoMessage = SUCCESS_PHOTO_PUBLISH;
      })
      .addCase(publishPhotoAsyncThunk.rejected, (photoState, photoAction) => {
        photoState.isLoading = false; // Finish loading
        photoState.hasError = photoAction.payload; // Set error status
        photoState.currentPhoto = {}; // Clear current selected photo
      })

      .addCase(getUserPhotosByUserIdAsyncThunk.pending, (photoState) => {
        photoState.isLoading = true; // Start loading
        photoState.hasError = false; // Clear error status
      })
      .addCase(
        getUserPhotosByUserIdAsyncThunk.fulfilled,
        (photoState, photoAction) => {
          photoState.isLoading = false; // Finish loading
          photoState.isSuccess = true; // Mark success
          photoState.hasError = null; // Clear error status
          photoState.allPhotosArray = photoAction.payload; // Update all photos array
        }
      )

      .addCase(deletePhotoAsyncThunk.pending, (photoState) => {
        photoState.isLoading = true; // Start loading
        photoState.hasError = false; // Clear error status
      })
      .addCase(deletePhotoAsyncThunk.fulfilled, (photoState, photoAction) => {
        photoState.isLoading = false; // Finish loading
        photoState.isSuccess = true; // Mark success
        photoState.hasError = null; // Clear error status

        const { bodyDeletePhotoID } = photoAction.payload;

        photoState.allPhotosArray = photoState.allPhotosArray.filter(
          (currentPhoto) => {
            return currentPhoto._id !== bodyDeletePhotoID;
          }
        );

        photoState.successPhotoMessage = SUCCESS_PHOTO_DELETE;
      })
      .addCase(deletePhotoAsyncThunk.rejected, (photoState, photoAction) => {
        photoState.isLoading = false; // Finish loading
        photoState.hasError = photoAction.payload; // Set error status
        photoState.currentPhoto = {}; // Clear current selected photo
      })

      .addCase(updatePhotoAsyncThunk.pending, (photoState) => {
        photoState.isLoading = true; // Start loading
        photoState.hasError = false; // Clear error status
      })
      .addCase(updatePhotoAsyncThunk.fulfilled, (photoState, photoAction) => {
        photoState.isLoading = false; // Finish loading
        photoState.isSuccess = true; // Mark success
        photoState.hasError = null; // Clear error status

        const { bodyUpdatePhotoID, bodyUpdatePhotoTitle } = photoAction.payload;

        photoState.allPhotosArray = photoState.allPhotosArray.map((mapItem) => {
          if (mapItem._id === bodyUpdatePhotoID) {
            return { ...mapItem, photoTitle: bodyUpdatePhotoTitle };
          }

          return mapItem;
        });

        photoState.successPhotoMessage = SUCCESS_PHOTO_UPDATE;
      })
      .addCase(updatePhotoAsyncThunk.rejected, (photoState, photoAction) => {
        photoState.isLoading = false; // Finish loading
        photoState.hasError = photoAction.payload; // Set error status
        photoState.currentPhoto = {}; // Clear current selected photo
      })

      .addCase(getPhotoUsingPhotoIdAsyncThunk.pending, (photoState) => {
        photoState.isLoading = true; // Start loading
        photoState.hasError = false; // Clear error status
      })
      .addCase(
        getPhotoUsingPhotoIdAsyncThunk.fulfilled,
        (photoState, photoAction) => {
          photoState.isLoading = false; // Finish loading
          photoState.isSuccess = true; // Mark success
          photoState.hasError = null; // Clear error status
          photoState.currentPhoto = photoAction.payload; // Update current selected photo
        }
      )

      .addCase(likeAnPhotoAsyncThunk.pending, (photoState) => {
        photoState.hasError = false; // Clear error status
      })
      .addCase(likeAnPhotoAsyncThunk.fulfilled, (photoState, photoAction) => {
        photoState.isSuccess = true; // Mark success
        photoState.hasError = null; // Clear error status

        const { photoLikesID, photoLikeCurrentUser_ID } = photoAction.payload;

        const ChatGPT_LikePhotosArray = photoState.allPhotosArray.map(
          (mapItem) => {
            if (mapItem._id === photoLikesID) {
              if (mapItem.photoLikesArray.includes(photoLikeCurrentUser_ID)) {
                // User unliked the photo, remove their ID
                mapItem.photoLikesArray = mapItem.photoLikesArray.filter(
                  (id) => id !== photoLikeCurrentUser_ID
                );
              } else {
                // User liked the photo, add their ID
                mapItem.photoLikesArray.push(photoLikeCurrentUser_ID);
              }
            }

            return mapItem;
          }
        );

        photoState.allPhotosArray = ChatGPT_LikePhotosArray;

        // Update the currentPhoto if applicable
        if (photoState.currentPhoto._id === photoLikesID) {
          if (
            photoState.currentPhoto.photoLikesArray.includes(
              photoLikeCurrentUser_ID
            )
          ) {
            // User unliked the photo, remove their ID
            photoState.currentPhoto.photoLikesArray =
              photoState.currentPhoto.photoLikesArray.filter(
                (id) => id !== photoLikeCurrentUser_ID
              );
          } else {
            // User liked the photo, add their ID
            photoState.currentPhoto.photoLikesArray.push(
              photoLikeCurrentUser_ID
            );
          }
        }
      })
      .addCase(likeAnPhotoAsyncThunk.rejected, (photoState, photoAction) => {
        photoState.hasError = photoAction.payload; // Set error status
      })

      .addCase(commentOnPhotoAsyncThunk.pending, (photoState) => {
        photoState.isLoading = true; // Start loading
        photoState.hasError = false; // Clear error status
      })
      .addCase(
        commentOnPhotoAsyncThunk.fulfilled,
        (photoState, photoAction) => {
          photoState.isLoading = false; // Finish loading
          photoState.isSuccess = true; // Mark success
          photoState.hasError = null; // Clear error status

          const { newPhotoComment } = photoAction.payload;
          // "newPhotoComment" from ReactGram/backend/src/controllers/photoControllers -> commentOnPhotoController -> response.status(200).json({ newPhotoComment: currentUserComment",

          photoState.currentPhoto.photoCommentsArray.push(newPhotoComment);

          photoState.successPhotoMessage = SUCCESS_PHOTO_LIKE;
        }
      )
      .addCase(commentOnPhotoAsyncThunk.rejected, (photoState, photoAction) => {
        photoState.isLoading = false; // Finish loading
        photoState.hasError = photoAction.payload; // Set error status
      })

      .addCase(getAllExistingPhotosAsyncThunk.pending, (photoState) => {
        photoState.isLoading = true; // Start loading
        photoState.hasError = false; // Clear error status
      })
      .addCase(
        getAllExistingPhotosAsyncThunk.fulfilled,
        (photoState, photoAction) => {
          photoState.isLoading = false; // Finish loading
          photoState.isSuccess = true; // Mark success
          photoState.hasError = null; // Clear error status
          photoState.allPhotosArray = photoAction.payload; // Update all photos array
        }
      )

      .addCase(searchPhotosByTitleAsyncThunk.pending, (photoState) => {
        photoState.isLoading = true; // Start loading
        photoState.hasError = false; // Clear error status
      })
      .addCase(
        searchPhotosByTitleAsyncThunk.fulfilled,
        (photoState, photoAction) => {
          console.log("photoAction result 02:", photoAction);
          console.log("photoAction.payload result 03:", photoAction.payload);

          photoState.isLoading = false; // Finish loading
          photoState.isSuccess = true; // Mark success
          photoState.hasError = null; // Clear error status
          photoState.allPhotosArray = photoAction.payload; // Update all photos array
        }
      );
  },
});

export const { clearPhotoMessage } = photoReducerSlice.actions;

export default photoReducerSlice.reducer;
