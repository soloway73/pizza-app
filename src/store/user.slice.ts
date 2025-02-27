import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../helpers/API";
import { LoginResponse, UserResponse } from "../interfaces/auth.interface";
import { loadState } from "./storage";

export const JWT_PERSISTENT_STATE = "userData";

export interface UserPersistentState {
  jwt: string | null;
}
export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  userData?: UserResponse | undefined;
  registerErrorMessage?: string;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const getData = createAsyncThunk(
  "user/profile",
  async (params: { jwt: string }) => {
    try {
      const { data } = await axios.get<UserResponse>(`${PREFIX}/user/profile`, {
        headers: { Authorization: `Bearer ${params.jwt}` },
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        `${PREFIX}/auth/register`,
        {
          email: params.email,
          password: params.password,
          name: params.name,
        }
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
