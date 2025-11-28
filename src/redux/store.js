import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./slices/roleSlice";
import themeReducer from "./slices/themeSlice";
import membersReducer from "./slices/membersSlice";

export const store = configureStore({
  reducer: {
    role: roleReducer,
    theme: themeReducer,
    members: membersReducer,
  },
});
