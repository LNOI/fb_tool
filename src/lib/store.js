import { configureStore, current } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import groupsReducer from "./features/groups/groupsSlice";
import commonReducer from "./features/common/commonSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      common: commonReducer,
      user: userReducer,
      groups: groupsReducer,
    },
  });
};
