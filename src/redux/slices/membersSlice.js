import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMembers = createAsyncThunk(
  "members/fetchMembers",
  async () => {
    const res = await fetch("https://dummyjson.com/users?limit=10");
    const data = await res.json();
    return data.users.map((u) => ({
      ...u,
      tasks: [],
      status: ["Working", "Break", "Meeting", "Offline"][
        Math.floor(Math.random() * 4)
      ],
    }));
  }
);

const membersSlice = createSlice({
  name: "members",
  initialState: { list: [], loading: false },
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
      .addCase(fetchMembers.pending, (s) => {
        s.loading = true;
      })
      .addCase(fetchMembers.fulfilled, (s, action) => {
        s.loading = false;
        s.list = action.payload;
      });
  },
});

export const { assignTask, updateTaskProgress, setStatus } =
  membersSlice.actions;
export default membersSlice.reducer;
