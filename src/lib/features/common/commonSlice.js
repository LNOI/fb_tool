import { createSlice, current } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    process: false,
  },
  reducers: {
    setProcess: (state, action) => {
      state.process = action.payload.process;
    },
  },
});

export const { setProcess } = commonSlice.actions;
export default commonSlice.reducer;
