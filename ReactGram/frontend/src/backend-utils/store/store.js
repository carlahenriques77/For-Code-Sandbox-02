import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "../slices/authSlice";
import userReducerSlice from "../slices/userSlice";
import photoReducerSlice from "../slices/photoSlice";

export const store = configureStore({
  reducer: {
    authReducer: authSliceReducer,
    userReducer: userReducerSlice,
    photoReducer: photoReducerSlice,
  },
});
