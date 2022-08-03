import { configureStore } from "@reduxjs/toolkit";
import reposeReducer from "../slices/githubSlices";

const store = configureStore({
  reducer: {
    repos: reposeReducer
  }
});

export default store;
