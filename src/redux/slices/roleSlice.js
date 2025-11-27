import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
  name: "role",
  initialState: {
    currentRole: "lead",
    currentUser: "Dylan Hunter",
  },
  reducers: {
    setRole: (s, a) => {
      s.currentRole = a.payload;
    },
  },
});

export const { setRole } = roleSlice.actions;
export default roleSlice.reducer;
