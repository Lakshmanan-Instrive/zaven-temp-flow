import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/AuthSlice";

const reducer = {
  auth: AuthReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
