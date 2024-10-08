import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LegalService from "../../services/LegalService";

const initialState = {
  legal: {
    legal: [],
    total: 0,
    page: 0,
    limit: 10,
    search: "",
    filter: "",
    sort: "",
  },
  legalProfile: {},
  legalUsers: {
    legalUsers: [],
    total: 0,
    page: 0,
    limit: 10,
    search: "",
    filter: "",
    sort: "",
  },
};

export const get_legal_call = createAsyncThunk(
  "legal/get_legal",
  async ({ page, limit, search, filter, sort }) => {
    console.log("page", page);
    const response = await LegalService.getLegalServices({
      page,
      limit,
      search,
      filter,
      sort,
    });
    return { data: response.data, page, limit, search, filter, sort };
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
  async ({ page, limit, search, filter, sort }) => {
    const response = await LegalService.getLegalServiceUsers({
      page,
      limit,
      search,
      filter,
      sort,
    });
    return {
      data: response.data,
      page,
      limit,
      search,
      filter,
      sort,
    };
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
        legal: {
          ...state.legal,
          legal: action.payload.data.detail.data,
          total: action.payload.data.detail.total,
          page: action.payload.page,
          limit: action.payload.limit,
          search: action.payload.search,
          filter: action.payload.filter,
          sort: action.payload.sort,
        },
      };
    });
    builder.addCase(create_legal_call.fulfilled, (state, action) => {
      return {
        ...state,
        payload: action.payload,
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
        legalUsers: {
          ...state.legalUsers,
          legalUsers: action.payload.data.detail.data,
          total: action.payload.data.detail.total,
          page: action.payload.page,
          limit: action.payload.limit,
          search: action.payload.search,
          filter: action.payload.filter,
          sort: action.payload.sort,
        },
      };
    });
    builder.addCase(invite_legal_user_call.fulfilled, (state, action) => {
      return {
        ...state,
        payload: action.payload,
      };
    });
    builder.addCase(
      update_legal_user_status_call.fulfilled,
      (state, action) => {
        return {
          ...state,
          legalUsers: {
            ...state.legalUsers,
            legalUsers: state.legalUsers.legalUsers.map((item) =>
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

export default legalSlice.reducer;
