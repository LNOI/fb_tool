import { createSlice, current } from "@reduxjs/toolkit";
import { dataPost } from "@/lib/data/data_post";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    data: [],
    currentPost: {},
    limit: 15,
    start: 0,
  },
  reducers: {
    setLoadPosts: (state, action) => {
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
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload.data;
    },
    setPreviousPage: (state) => {
      state.start = state.start - state.limit;
    },
    setNextPage: (state) => {
      state.start = state.start + state.limit;
    },
  },
});

export const { setLoadPosts, setPreviousPage, setNextPage,setCurrentPost } =
  postsSlice.actions;
export default postsSlice.reducer;
