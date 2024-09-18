import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/UserService";

const initialState = {
  users: [],
};

export const userChangePassword = createAsyncThunk(
  "users/userChangePassword",
  async (data) => {
    const response = await UserService.userChangePassword(data);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userChangePassword.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

const { reducer } = userSlice;

export default reducer;
