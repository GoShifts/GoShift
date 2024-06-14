import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

// Define a type for the slice state
interface CounterState {
  value: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
};

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async () => {
    const response = await fetch("http://localhost:8000");
    const data = await response.json();
    return response;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(
        incrementAsync.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.status = "idle";
          state.value += action.payload;
        }
      );
  },
});

export const { increment } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
