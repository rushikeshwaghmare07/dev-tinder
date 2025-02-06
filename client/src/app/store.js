import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice.js";
import feedReducer from "./features/feed/feedSlice.js";
import connectionReducer from "./features/connections/connectionSlice.js"

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer
  },
});