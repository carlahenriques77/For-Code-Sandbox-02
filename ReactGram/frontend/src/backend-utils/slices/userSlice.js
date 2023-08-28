import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userServiceExport from "../services/userService";

const initialState = {
  currentUser: {},
  hasError: false,
  isSuccess: false,
  isLoading: false,
  successMessage: null, // Renamed from hasMessage
};

// Get User Details
// Create an async thunk for user registration
export const profileAsyncThunk = createAsyncThunk(
  "userSlice/getCurrentUserProfileData",
  async (profileData, thunkAPI) => {
    const getCurrentUserToken =
      thunkAPI.getState().authReducer.currentUser.userToken;
    // "userToken" is from backend userControllers

    try {
      const getUserProfileData = await userServiceExport.getProfileService(
        profileData,
        getCurrentUserToken
      );

      return getUserProfileData;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateProfileAsyncThunk = createAsyncThunk(
  "userSlice/updateProfile",
  async (profileData, thunkAPI) => {
    const getCurrentUserToken =
      thunkAPI.getState().authReducer.currentUser.userToken;
    // "userToken" is from backend userControllers

    const updateProfileData = await userServiceExport.putUpdateProfileService(
      profileData,
      getCurrentUserToken
    );

    // Check for Errors
    if (updateProfileData.formValidationErrors) {
      return thunkAPI.rejectWithValue(
        updateProfileData.formValidationErrors[0]
      );
    }

    return updateProfileData;
  }
);

// Get User Details
export const getUserDetailsByIDAsyncThunk = createAsyncThunk(
  "userSlice/getUserDetailsById",
  async (userProfileID, thunkAPI) => {
    const retrieveUserProfileByID =
      await userServiceExport.getUserDetailsByIDService(userProfileID);

    return retrieveUserProfileByID;
  }
);

export const userReducerSlice = createSlice({
  // Renamed from theUserSlice
  name: "userReducer",
  initialState,
  reducers: {
    clearUserMessage: (resetState) => {
      // Renamed from resetUserMessage
      resetState.successMessage = null;
    },
  },

  extraReducers: (userBuilder) => {
    userBuilder

      .addCase(profileAsyncThunk.pending, (userState) => {
        userState.isLoading = true; // Start loading
        userState.hasError = false; // Clear error status
      })
      .addCase(profileAsyncThunk.fulfilled, (userState, userAction) => {
        userState.isLoading = false; // Finish loading
        userState.isSuccess = true; // Mark success
        userState.hasError = null; // Clear error status
        userState.currentUser = userAction.payload; // Update current user data
      })

      .addCase(updateProfileAsyncThunk.pending, (userState) => {
        userState.isLoading = true; // Start loading
        userState.hasError = false; // Clear error status
      })
      .addCase(updateProfileAsyncThunk.fulfilled, (userState, userAction) => {
        userState.isLoading = false; // Finish loading
        userState.isSuccess = true; // Mark success
        userState.hasError = null; // Clear error status
        userState.currentUser = userAction.payload; // Update current user data
        userState.successMessage = "User Updated Sucessfully";
      })
      .addCase(updateProfileAsyncThunk.rejected, (userState, userAction) => {
        userState.isLoading = false; // Finish loading
        userState.hasError = userAction.payload; // Set error status
        userState.currentUser = {}; // Reset current user data
      })

      .addCase(getUserDetailsByIDAsyncThunk.pending, (userState) => {
        userState.isLoading = true; // Start loading
        userState.hasError = false; // Clear error status
      })
      .addCase(
        getUserDetailsByIDAsyncThunk.fulfilled,
        (userState, userAction) => {
          userState.isLoading = false; // Finish loading
          userState.isSuccess = true; // Mark success
          userState.hasError = null; // Clear error status
          userState.currentUser = userAction.payload; // Update current user data
        }
      );
  },
});

export const { clearUserMessage } = userReducerSlice.actions; // Updated from resetUserMessage

export default userReducerSlice.reducer;