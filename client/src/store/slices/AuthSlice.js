import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";

const initialState = {
  token: null,
};

export const login_call = createAsyncThunk("auth/login", async (data) => {
  const response = await AuthService.login(data);
  return response.data;
});

export const logout_call = createAsyncThunk("auth/logout", async (data) => {
  const response = await AuthService.logout(data);
  return response.data;
});

export const change_password_call = createAsyncThunk(
  "auth/change_password",
  async (data) => {
    const response = await AuthService.changePassword(data);
    return response.data;
  }
);

export const verify_call = createAsyncThunk("auth/verify", async (data) => {
  const response = await AuthService.verify(data);
  return response.data;
});

export const invite_call = createAsyncThunk("auth/invite", async (data) => {
  const response = await AuthService.invite(data);
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login_call.fulfilled, (state, action) => {
      return {
        ...state,
        token: action.payload.session.accessToken,
      };
    });
    builder.addCase(logout_call.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(change_password_call.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(verify_call.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(invite_call.fulfilled, (state, action) => {
      console.log("Invite Response", action.payload);
      return action.payload;
    });
  },
});

const { reducer } = authSlice;
export default reducer;
