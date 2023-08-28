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
      // Call the service to update a user's photo
      const updatingPhotoResponse = await photoService.updatePhotoService(
        { photoTitle: photoData.editPhotoTitleData },
        photoData.bodyUpdatePhotoID,
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

        photoState.allPhotosArray = photoState.allPhotosArray.filter(
          (currentPhoto) => {
            return currentPhoto._id !== photoAction.payload.bodyDeletePhotoID;
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

        photoState.allPhotosArray = photoState.allPhotosArray.map((mapItem) => {
          if (mapItem._id === photoAction.payload.bodyUpdatePhotoID) {
            return { ...mapItem, photoTitle: photoAction.payload.photoTitle };
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
        photoState.isLoading = true; // Start loading
        photoState.hasError = false; // Clear error status
      })
      .addCase(likeAnPhotoAsyncThunk.fulfilled, (photoState, photoAction) => {
        photoState.isLoading = false; // Finish loading
        photoState.isSuccess = true; // Mark success
        photoState.hasError = null; // Clear error status

        console.log("photoAction 02: ", photoAction)

        if(photoState.currentPhoto.photoLikesArray) {
          photoState.currentPhoto.photoLikesArray.push(photoAction.payload.photoLikeCurrentUser_ID)
        }

        photoState.allPhotosArray = photoState.allPhotosArray.map((mapItem) => {
          if (mapItem._id === photoAction.payload.photoLikesID) {
            return mapItem.photoLikesArray.push(photoAction.payload.photoLikeCurrentUser_ID)
          }

          return mapItem;
        });

        photoState.successPhotoMessage = SUCCESS_PHOTO_LIKE;
      })
      .addCase(likeAnPhotoAsyncThunk.rejected, (photoState, photoAction) => {
        photoState.isLoading = false; // Finish loading
        photoState.hasError = photoAction.payload; // Set error status
      });
  },
});

export const { clearPhotoMessage } = photoReducerSlice.actions;

export default photoReducerSlice.reducer;
