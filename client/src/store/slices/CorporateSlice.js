import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CorporateService from "../../services/CorporateService";

const initialState = {
  corporate: {
    corporate: [],
    total: 0,
    page: 0,
    limit: 10,
  },
  corporateProfile: {},
  corporateUsers: {
    corporateUsers: [],
    total: 0,
    page: 0,
    limit: 10,
  },
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
  async ({ page, limit }) => {
    const response = await CorporateService.getCorporateUsers({ page, limit });
    return {
      data: response.data,
      page,
      limit,
    };
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
        corporate: {
          ...state.corporate,
          corporate: action.payload.data.detail.data,
          total: action.payload.data.detail.total,
          page: action.payload.page,
          limit: action.payload.limit,
        },
      };
    });
    builder.addCase(create_corporate_call.fulfilled, (state, action) => {
      return {
        ...state,
        payload: action.payload,
      };
    });
    builder.addCase(update_corporate_status_call.fulfilled, (state, action) => {
      console.log("Update Response", action.payload);
      return {
        ...state,
        corporate: {
          ...state.corporate,
          corporate: state.corporate.corporate.map((item) =>
            item._id === action.payload.detail._id
              ? action.payload.detail
              : item
          ),
        },
      };
    });
    builder.addCase(get_corporate_profile_call.fulfilled, (state, action) => {
      return {
        ...state,
        corporateProfile: action.payload.detail[0],
      };
    });
    builder.addCase(get_corporate_users_call.fulfilled, (state, action) => {
      return {
        ...state,
        corporateUsers: {
          ...state.corporateUsers,
          corporateUsers: action.payload.data.detail.data,
          total: action.payload.data.detail.total,
          page: action.payload.page,
          limit: action.payload.limit,
        },
      };
    });
    builder.addCase(invite_corporate_user_call.fulfilled, (state, action) => {
      return {
        ...state,
        payload: action.payload,
      };
    });
    builder.addCase(
      update_corporate_user_status_call.fulfilled,
      (state, action) => {
        return {
          ...state,
          corporateUsers: {
            ...state.corporateUsers,
            corporateUsers: state.corporateUsers.corporateUsers.map((item) =>
              item._id === action.payload.detail._id
                ? action.payload.detail
                : item
            ),
          },
        };
      }
    );
  },
});

export default corporateSlice.reducer;
