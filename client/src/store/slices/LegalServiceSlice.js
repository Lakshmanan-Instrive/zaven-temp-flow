import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LegalService from "../../services/LegalService";

const initialState = {
  legal: null,
};

export const get_legal_call = createAsyncThunk(
  "legal/get_legal",
  async (data) => {
    const response = await LegalService.getLegalServices(data);
    return response.data;
  }
);

export const create_legal_call = createAsyncThunk(
  "legal/create_legal",
  async (data) => {
    const response = await LegalService.createLegalService(data);
    return response.data;
  }
);

export const update_legal_status_call = createAsyncThunk(
  "legal/update_legal_status",
  async (id, data) => {
    const response = await LegalService.updateLegalServiceStatus(id, data);
    return response.data;
  }
);

export const get_legal_profile_call = createAsyncThunk(
  "legal/get_legal_profile",
  async (data) => {
    const response = await LegalService.getLegalServiceProfile(data);
    return response.data;
  }
);

export const get_legal_users_call = createAsyncThunk(
  "legal/get_legal_users",
  async (data) => {
    const response = await LegalService.getLegalServiceUsers(data);
    return response.data;
  }
);

export const invite_legal_user_call = createAsyncThunk(
  "legal/invite_legal_user",
  async (data) => {
    const response = await LegalService.inviteLegalServiceUser(data);
    return response.data;
  }
);

export const update_legal_user_status_call = createAsyncThunk(
  "legal/update_legal_user_status",
  async (data) => {
    const response = await LegalService.updateLegalServiceUserStatus(data);
    return response.data;
  }
);

const legalSlice = createSlice({
  name: "legal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get_legal_call.fulfilled, (state, action) => {
      return {
        ...state,
        legal: action.payload,
      };
    });
    builder.addCase(create_legal_call.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(update_legal_status_call.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(get_legal_profile_call.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(get_legal_users_call.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(invite_legal_user_call.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(
      update_legal_user_status_call.fulfilled,
      (state, action) => {
        return action.payload;
      }
    );
  },
});

export default legalSlice.reducer;
