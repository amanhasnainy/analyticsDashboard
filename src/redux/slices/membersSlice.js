// src/redux/slices/membersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async () => {
    // Delay only for skeleton testing, optional
    await new Promise((res) => setTimeout(res, 200));

    const res = await fetch("https://randomuser.me/api/?results=10&nat=us");
    const data = await res.json();

    return data.results.map((u, index) => ({
      id: index + 1,
      firstName: u.name.first,
      lastName: u.name.last,
      email: u.email,
      image: u.picture.large,      // ⭐ high-quality avatar
      gender: u.gender,
      tasks: [],
      status: ["Working", "Break", "Meeting", "Offline"][
        Math.floor(Math.random() * 4)
      ],
    }));
  }
);


const membersSlice = createSlice({
  name: "members",
  initialState: {
    list: [],
    loading: false,
    error: false,
  },
  reducers: {
    assignTask(state, action) {
      const { memberId, task } = action.payload;
      const user = state.list.find((m) => m.id == memberId);
      if (user) user.tasks.push(task);
    },

    updateTaskProgress(state, action) {
      const { memberId, taskId, delta } = action.payload;
      const user = state.list.find((m) => m.id == memberId);
      if (!user) return;

      const task = user.tasks.find((t) => t.id === taskId);
      if (!task) return;

      task.progress = Math.max(0, Math.min(100, task.progress + delta));
      task.completed = task.progress === 100;
    },

    setStatus(state, action) {
      const { memberId, status } = action.payload;
      const user = state.list.find((m) => m.id == memberId);
      if (user) user.status = status;
    },
  },

  extraReducers: (builder) => {
    builder
      // 🔵 Data fetching started (show Skeletons)
      .addCase(fetchMembers.pending, (s) => {
        s.loading = true;
        s.error = false;
      })

      // 🟢 Data loaded successfully
      .addCase(fetchMembers.fulfilled, (s, action) => {
        s.loading = false;
        s.error = false;
        s.list = action.payload;
      })

      // 🔴 API failed → hide skeleton + show error fallback
      .addCase(fetchMembers.rejected, (s) => {
        s.loading = false;
        s.error = true;
      });
  },
});

export const { assignTask, updateTaskProgress, setStatus } =
  membersSlice.actions;

export default membersSlice.reducer;
