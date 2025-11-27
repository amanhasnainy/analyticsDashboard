// src/redux/slices/membersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Optional: fetch fake users from randomuser.me
export const fetchMembers = createAsyncThunk('members/fetchMembers', async () => {
  const res = await fetch('https://randomuser.me/api/?results=4&nat=us'); // or simulate
  const data = await res.json();
  // map to our minimal member shape
  return data.results.map((u, idx) => ({
    id: u.login.uuid,
    name: `${u.name.first} ${u.name.last}`,
    avatar: u.picture.thumbnail,
    status: 'Offline', // Working, Break, Meeting, Offline
    tasks: [
      // sample task structure
      // { id: 't1', title: 'Design API', dueDate: '2025-12-01', progress: 20, completed: false }
    ]
  }));
});

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    list: [], // array of members
    status: 'idle',
    error: null
  },
  reducers: {
    setStatus: (state, action) => {
      const { memberId, status } = action.payload;
      const m = state.list.find(x => x.id === memberId);
      if (m) m.status = status;
    },
    assignTask: (state, action) => {
      const { memberId, task } = action.payload;
      const m = state.list.find(x => x.id === memberId);
      if (m) {
        m.tasks = m.tasks || [];
        m.tasks.push(task);
      }
    },
    updateTaskProgress: (state, action) => {
      const { memberId, taskId, delta } = action.payload;
      const m = state.list.find(x => x.id === memberId);
      if (!m) return;
      const t = m.tasks.find(t => t.id === taskId);
      if (!t) return;
      t.progress = Math.min(100, Math.max(0, t.progress + delta));
      if (t.progress === 100) t.completed = true;
      else t.completed = false;
    },
    completeTask: (state, action) => {
      const { memberId, taskId } = action.payload;
      const m = state.list.find(x => x.id === memberId);
      if (!m) return;
      const t = m.tasks.find(t => t.id === taskId);
      if (t) {
        t.progress = 100;
        t.completed = true;
      }
    },
    addMember: (state, action) => {
      state.list.push(action.payload);
    },
    removeMember: (state, action) => {
      state.list = state.list.filter(m => m.id !== action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // attach default tasks to show functionality
        state.list = action.payload.map((m, idx) => ({
          ...m,
          tasks: [
            {
              id: `${m.id}-t1`,
              title: idx === 0 ? 'Onboard docs' : 'Implement feature',
              dueDate: new Date(Date.now() + (idx + 3) * 24 * 60 * 60 * 1000).toISOString().slice(0,10),
              progress: idx * 10,
              completed: false
            }
          ]
        }));
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const {
  setStatus,
  assignTask,
  updateTaskProgress,
  completeTask,
  addMember,
  removeMember
} = membersSlice.actions;

export default membersSlice.reducer;
