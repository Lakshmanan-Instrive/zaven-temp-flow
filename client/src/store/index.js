import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/AuthSlice";
import CorporateReducer from "./slices/CorporateSlice";
import LegalServiceReducer from "./slices/LegalServiceSlice";
import RefreshTokenReducer from "./slices/RefreshTokenSlice";
import UserReducer from "./slices/UserSlice";

const reducer = {
  auth: AuthReducer,
  corporate: CorporateReducer,
  legal: LegalServiceReducer,
  refreshToken: RefreshTokenReducer,
  user: UserReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
