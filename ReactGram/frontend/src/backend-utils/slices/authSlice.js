// Import necessary dependencies
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authenticationService from "../services/authService";

// Load the current user data from local storage if available
const currentUserData = JSON.parse(localStorage.getItem("itemUser"));

// Define the initial state for the authentication slice
const initialState = {
  currentUser: currentUserData ? currentUserData : null, // Current user data, or null if not logged in
  hasError: false, // Indicates if an error occurred
  isSuccess: false, // Indicates if an action was successful
  isLoading: false, // Indicates if a request is in progress
};

// Create an async thunk for user registration
export const registrationAsyncThunk = createAsyncThunk(
  "authSlice/registerUser",
  async (userData, thunkAPI) => {
    // Call the registration service from the authentication service
    const registrationResponse =
      await authenticationService.registrationService(userData);

    // Check for errors in the response
    if (registrationResponse.formValidationErrors) {
      // Reject the promise with the first error
      return thunkAPI.rejectWithValue(
        registrationResponse.formValidationErrors[0]
      );
    } // "formValidationErrors" from /ReactGram/backend/src/middlewares/handleValidation -> const formValidationDefense -> const formValidationErrors

    // Return the registration response
    return registrationResponse;
  }
);

// Logout User
export const logoutAsyncThunk = createAsyncThunk(
  "authSlice/logoutUser",
  async () => {
    await authenticationService.logoutService();
  }
);

// Log an User In
export const loginAsyncThunk = createAsyncThunk(
  "authSlice/loginUser",
  async (userData, thunkAPI) => {
    // Call the registration service from the authentication service
    const loginResponse =
      await authenticationService.loginService(userData);

    // Check for errors in the response
    if (loginResponse.formValidationErrors) {
      // Reject the promise with the first error
      return thunkAPI.rejectWithValue(
        loginResponse.formValidationErrors[0]
      );
    } // "formValidationErrors" from /ReactGram/backend/src/middlewares/handleValidation -> const formValidationDefense -> const formValidationErrors

    // Return the registration response
    return loginResponse;
  }
);

// Create the authentication slice using createSlice
export const authReducerSlice = createSlice({
  name: "authReducer", // Slice name
  initialState, // Initial state defined earlier
  reducers: {
    // Reducer to reset the authentication state
    resetAuth: (resetState) => {
      resetState.isLoading = false;
      resetState.hasError = false;
      resetState.isSuccess = false;
    },
  },
  extraReducers: (authBuilder) => {
    // Reducers for handling async actions
    authBuilder
    
      .addCase(registrationAsyncThunk.pending, (authState) => {
        authState.isLoading = true; // Start loading
        authState.hasError = false; // Clear error status
      })
      .addCase(registrationAsyncThunk.fulfilled, (authState, authAction) => {
        authState.isLoading = false; // Finish loading
        authState.isSuccess = true; // Mark success
        authState.hasError = null; // Clear error status
        authState.currentUser = authAction.payload; // Update current user data
      })
      .addCase(registrationAsyncThunk.rejected, (authState, authAction) => {
        authState.isLoading = false; // Finish loading
        authState.hasError = authAction.payload; // Set error status
        authState.currentUser = null; // Reset current user data
      })
      
      .addCase(logoutAsyncThunk.fulfilled, (authState, authAction) => {
        authState.isLoading = false; // Finish loading
        authState.isSuccess = true; // Mark success
        authState.hasError = null; // Clear error status
        authState.currentUser = null; // Update current user data
      })
      
      .addCase(loginAsyncThunk.pending, (authState) => {
        authState.isLoading = true; // Start loading
        authState.hasError = false; // Clear error status
      })
      .addCase(loginAsyncThunk.fulfilled, (authState, authAction) => {
        authState.isLoading = false; // Finish loading
        authState.isSuccess = true; // Mark success
        authState.hasError = null; // Clear error status
        authState.currentUser = authAction.payload; // Update current user data
      })
      .addCase(loginAsyncThunk.rejected, (authState, authAction) => {
        authState.isLoading = false; // Finish loading
        authState.hasError = authAction.payload; // Set error status
        authState.currentUser = null; // Reset current user data
      });
  },
});

// Export actions for resetting the authentication state
export const { resetAuth } = authReducerSlice.actions;

// Export the reducer for use in the store
export default authReducerSlice.reducer;
