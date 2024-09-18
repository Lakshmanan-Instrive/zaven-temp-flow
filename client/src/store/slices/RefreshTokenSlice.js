import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RefreshTokenService from "../../services/RefreshTokenService";

const initialState = {
  refreshToken: null,
};

export const refresh_token_call = createAsyncThunk(
  "refresh_token/refresh_token",
  async (data) => {
    const response = await RefreshTokenService.refresh(data);
    return response.data;
  }
);

const refreshTokenSlice = createSlice({
  name: "refresh_token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(refresh_token_call.fulfilled, (state, action) => {
      return {
        ...state,
        refreshToken: action.payload,
      };
    });
  },
});

export default refreshTokenSlice.reducer;
