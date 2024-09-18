import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CorporateService from "../../services/CorporateService";

const initialState = {
  corporate: [],
  page: 0,
  limit: 10,
  total: 0,
  corporateProfile: {},
  corporateUsers: [],
};

export const get_corporate_call = createAsyncThunk(
  "corporate/get_corporate",
  async ({ page, limit }) => {
    const response = await CorporateService.getCorporate({ page, limit });
    return { data: response.data, page, limit };
  }
);

export const create_corporate_call = createAsyncThunk(
  "corporate/create_corporate",
  async (data) => {
    const response = await CorporateService.createCorporate(data);
    return response.data;
  }
);

export const update_corporate_status_call = createAsyncThunk(
  "corporate/update_corporate_status",
  async (data) => {
    const response = await CorporateService.updateCorporateStatus(data);
    return response.data;
  }
);

export const get_corporate_profile_call = createAsyncThunk(
  "corporate/get_corporate_profile",
  async (data) => {
    const response = await CorporateService.getCorporateProfile(data);
    return response.data;
  }
);

export const get_corporate_users_call = createAsyncThunk(
  "corporate/get_corporate_users",
  async (data) => {
    const response = await CorporateService.getCorporateUsers(data);
    return response.data;
  }
);

export const invite_corporate_user_call = createAsyncThunk(
  "corporate/invite_corporate_user",
  async (data) => {
    const response = await CorporateService.inviteCorporateUser(data);
    return response.data;
  }
);

export const update_corporate_user_status_call = createAsyncThunk(
  "corporate/update_corporate_user_status",
  async (data) => {
    const response = await CorporateService.updateCorporateUserStatus(data);
    return response.data;
  }
);

const corporateSlice = createSlice({
  name: "corporate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get_corporate_call.fulfilled, (state, action) => {
      console.log("Corporate Response", action.payload.data.detail.total);
      return {
        ...state,
        corporate: action.payload.data.detail.data,
        page: action.payload.page,
        limit: action.payload.limit,
        total: action.payload.data.detail.total,
      };
    });
    builder.addCase(create_corporate_call.fulfilled, (state, action) => {
      return {
        ...state,
        corporate: [...state.corporate, action.payload],
      };
    });
    builder.addCase(update_corporate_status_call.fulfilled, (state, action) => {
        console.log("Update Response", action.payload);
      return {
        ...state,
        corporate: state.corporate.map((item) =>
          item._id === action.payload.detail._id ? action.payload.detail : item
        ),
      };
    });
    builder.addCase(get_corporate_profile_call.fulfilled, (state, action) => {
      return {
        ...state,
        corporateProfile: action.payload,
      };
    });
    builder.addCase(get_corporate_users_call.fulfilled, (state, action) => {
      return {
        ...state,
        corporateUsers: action.payload,
      };
    });
    builder.addCase(invite_corporate_user_call.fulfilled, (state, action) => {
      console.log("Invite Response", action.payload);
      return {
        ...state,
        corporateUsers: [...state.corporateUsers, action.payload],
      };
    });
    builder.addCase(
      update_corporate_user_status_call.fulfilled,
      (state, action) => {
        return {
          ...state,
          corporateUsers: state.corporateUsers.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        };
      }
    );
  },
});

export default corporateSlice.reducer;
