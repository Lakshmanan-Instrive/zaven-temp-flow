import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LegalService from "../../services/LegalService";

const initialState = {
  legal: {
    legal: [],
    total: 0,
    page: 0,
    limit: 10,
  },
  legalProfile: {},
  legalUsers: {
    data: [],
    total: 0,
    page: 0,
    limit: 10,
  },
};

export const get_legal_call = createAsyncThunk(
  "legal/get_legal",
  async ({ page, limit }) => {
    console.log("page", page);
    const response = await LegalService.getLegalServices({ page, limit });
    return { data: response.data, page, limit };
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
  async (data) => {
    const response = await LegalService.updateLegalServiceStatus(data);
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
        console.log("action.payload", action.payload);
      return {
        ...state,
        legal: {
          ...state.legal,
          legal: action.payload.data.detail.data,
          total: action.payload.data.detail.total,
          page: action.payload.page,
          limit: action.payload.limit,
        },
      };
    });
    builder.addCase(create_legal_call.fulfilled, (state, action) => {
      return {
        ...state,
        legal: [...state.legal, action.payload],
      };
    });
    builder.addCase(update_legal_status_call.fulfilled, (state, action) => {
      return {
        ...state,
        legal: {
          ...state.legal,
          legal: state.legal.legal.map((item) =>
            item._id === action.payload.detail._id
              ? action.payload.detail
              : item
          ),
        },
      };
    });
    builder.addCase(get_legal_profile_call.fulfilled, (state, action) => {
      return {
        ...state,
        legalProfile: action.payload.detail[0],
      };
    });
    builder.addCase(get_legal_users_call.fulfilled, (state, action) => {
      return {
        ...state,
        legalUsers: action.payload,
      };
    });
    builder.addCase(invite_legal_user_call.fulfilled, (state, action) => {
      return {
        ...state,
        legalUsers: [...state.legalUsers, action.payload],
      };
    });
    builder.addCase(
      update_legal_user_status_call.fulfilled,
      (state, action) => {
        return {
          ...state,
          legalUsers: state.legalUsers.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        };
      }
    );
  },
});

export default legalSlice.reducer;
