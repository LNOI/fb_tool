import { createSlice, current } from "@reduxjs/toolkit";


import { dataGroup } from "@/lib/data/data_group";

export const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    data:dataGroup,
    currentGroup: {},
    limit: 15,
    start: 0,
  },
  reducers: {
    setLoadGroups: (state, action) => {
      if (action.payload.refresh) {
        state.start = 0;
        state.data = action.payload.data;
        return;
      }
      if (
        state.data.slice(state.start, state.start + state.limit).length === 0
      ) {
        state.data = [...state.data, ...action.payload.data];
      }
    },
    setPreviousPage: (state) => {
      state.start = state.start - state.limit;
    },
    setNextPage: (state) => {
      state.start = state.start + state.limit;
    },
  },
});

export const { setLoadGroups, setPreviousPage, setNextPage } =
  groupsSlice.actions;
export default groupsSlice.reducer;
