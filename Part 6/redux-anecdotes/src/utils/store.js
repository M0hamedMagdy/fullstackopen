import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "../reducers/anecdoteReducer";
import notificationReducer from "../reducers/notificationReducer.js";
import filterReducer from "../reducers/filterReducer.js";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer,
  },
});

export default store;
