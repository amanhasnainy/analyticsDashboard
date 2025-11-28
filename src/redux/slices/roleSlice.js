// src/redux/slices/roleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "role",
  initialState: {
    currentRole: "lead", // manager
    currentUser: "Andre Bradley",
  },
  reducers: {
    setRole(state, action) {
      state.currentRole = action.payload;
    },
    setUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setRole, setUser } = roleSlice.actions;
export default roleSlice.reducer;
