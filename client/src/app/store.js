import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.js";
import feedReducer from "../features/feed/feedSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});