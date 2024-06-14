import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { serverUrl } from "../../utils/common";
import { Root } from "react-dom/client";

// Define a type for the slice state
interface AuthState {
  loggedInUserToken: String | null;
  status: String;
  error: String | null;
  message: String | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  loggedInUserToken: null,
  status: "idle",
  error: null,
  message: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData: Object) => {
    const response = await fetch(`${serverUrl}/auth/register`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    // console.log(response);
    const data = await response.json();
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      // state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log(action.payload);
        state.loggedInUserToken = action.payload.token;
        state.message = action.payload.message;
      });
  },
});

export const { increment } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoggedInUser = (state: RootState) =>
  state.auth.loggedInUserToken;
export const selectError = (state: RootState) => state.auth.error;
export const selectMessage = (state: RootState) => state.auth.message;

export default authSlice.reducer;
