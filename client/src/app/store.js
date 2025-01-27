import { configureStore } from "@reduxjs/toolkit";
import userReduce from "../features/user/userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReduce,
  },
});