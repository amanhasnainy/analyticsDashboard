// src/components/manager/ManagerView.jsx
import React, { useEffect, useState } from "react";
import ProArea from "../charts/ProArea";
import GenderPie from "../charts/GenderPie";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers, assignTask } from "../../redux/slices/membersSlice";
import UserList from "./UserList";
import { v4 as uuidv4 } from "uuid";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

/**
 * StatusPie - small local pie component for status distribution.
 * Accepts `data` prop as [{ name: 'Working', value: 3 }, ...]
 */
function StatusPie({ data = [] }) {
  const COLORS = ["#10B981", "#F59E0B", "#3B82F6", "#9CA3AF"]; // Working, Break, Meeting, Offline
  // ensure fallback
  if (!data || data.reduce((s, d) => s + (d.value || 0), 0) === 0) {
    data = [
      { name: "Working", value: 1 },
      { name: "Break", value: 1 },
      { name: "Meeting", value: 1 },
      { name: "Offline", value: 1 },
    ];
  }

  return (
    <ResponsiveContainer width="100%" height={170}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={64}
          paddingAngle={3}
        >
          {data.map((entry, idx) => (
            <Cell key={`c-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function ManagerView() {
  const dispatch = useDispatch();
  const members = useSelector((s) => s.members.list || []);
  const loading = useSelector((s) => s.members.loading);

  // local form state
  const [memberId, setMemberId] = useState("");
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");

  useEffect(() => {
    dispatch(fetchMembers()); // fetch first 10 by slice in thunk
  }, [dispatch]);

  // set default member for form when list loads
  useEffect(() => {
    if (!memberId && members.length > 0) {
      setMemberId(String(members[0].id));
    }
  }, [members, memberId]);

  // compute status counts
  const statusCounts = { Working: 0, Break: 0, Meeting: 0, Offline: 0 };
  const genderCounts = { male: 0, female: 0, other: 0 };

  members.forEach((m) => {
    const s = m.status || "Offline";
    if (statusCounts[s] !== undefined) statusCounts[s] += 1;
    else statusCounts.Offline += 1;

    const g = (m.gender || "male").toLowerCase();
    if (g === "male") genderCounts.male += 1;
    else if (g === "female") genderCounts.female += 1;
    else genderCounts.other += 1;
  });

  const statusData = [
    { name: "Working", value: statusCounts.Working },
    { name: "Break", value: statusCounts.Break },
    { name: "Meeting", value: statusCounts.Meeting },
    { name: "Offline", value: statusCounts.Offline },
  ];

  const genderData = [
    { name: "Male", value: genderCounts.male },
    { name: "Female", value: genderCounts.female },
    { name: "Other", value: genderCounts.other },
  ];

  const onAssign = (e) => {
    e.preventDefault();
    if (!memberId || !title) return alert("Please select a member and enter a title");
    const task = {
      id: uuidv4(),
      title,
      dueDate: due,
      progress: 0,
      completed: false,
    };
    dispatch(assignTask({ memberId, task }));
    setTitle("");
    setDue("");
  };

  return (
    <div className="space-y-6">
      {/* Top row: Area chart + Applications card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProArea />
        </div>

        {/* Applications card with Interviews/Hired stats */}
        <div className="relative rounded-xl p-6 shadow text-white 
     bg-gradient-to-br from-[#6B7CFF] to-[#3A4DB3]
     dark:from-[#1F2539] dark:to-[#1A2033]">
          <div>
            <div className="text-xl text-white dark:text-gray-400">Applications</div>
            <div className="text-4xl font-bold text-gray-800 dark:text-white mt-2">1546</div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Interviews</span>
              <span className="font-semibold text-gray-900 dark:text-white">246</span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Hired</span>
              <span className="font-semibold text-gray-900 dark:text-white">101</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle row: availability/status pie + gender pie + assign/interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Availability & quick KPIs */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Employees Availability</h4>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="p-3 border rounded">
                <div className="text-xs text-gray-500">Attendance</div>
                <div className="text-2xl font-bold mt-2">{members.length * 8}</div>
              </div>
              <div className="p-3 border rounded">
                <div className="text-xs text-gray-500">Late Coming</div>
                <div className="text-2xl font-bold mt-2">17</div>
              </div>
              <div className="p-3 border rounded">
                <div className="text-xs text-gray-500">Absent</div>
                <div className="text-2xl font-bold mt-2">6</div>
              </div>
              <div className="p-3 border rounded">
                <div className="text-xs text-gray-500">Leave Apply</div>
                <div className="text-2xl font-bold mt-2">14</div>
              </div>
            </div>
          </div>

          {/* Status Pie (employee availability distribution) */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 dark:text-white">Status Distribution</h4>
              <div className="text-sm text-gray-500 dark:text-gray-300">{members.length} employees</div>
            </div>

            <div className="mt-3 h-44">
              <StatusPie data={statusData} />
            </div>

            <div className="mt-3 text-xs text-gray-600 dark:text-gray-300 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-green-500 rounded-full"></span> Working ({statusCounts.Working})</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-amber-500 rounded-full"></span> Break ({statusCounts.Break})</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> Meeting ({statusCounts.Meeting})</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-gray-400 rounded-full"></span> Offline ({statusCounts.Offline})</div>
            </div>
          </div>
        </div>

        {/* Right column: Gender pie + assign form + interviews quick view */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 dark:text-white">Total Employees</h4>
              <div className="font-bold">{members.length}</div>
            </div>

            <div className="mt-3 h-44">
              <GenderPie data={genderData} />
            </div>

            <div className="mt-2 text-xs text-gray-500">Male · Female · Other</div>
          </div>

          {/* Assign Task */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Assign New Task</h4>
            <form onSubmit={onAssign} className="mt-3 space-y-2">
              <select
                className="w-full p-2 border rounded"
                value={memberId}
                onChange={(e) => setMemberId(Number(e.target.value))}
              >
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.firstName} {m.lastName}
                  </option>
                ))}
              </select>

              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="date"
                className="w-full p-2 border rounded"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />

              <button type="submit" className="w-full py-2 bg-primary text-white rounded">
                Assign Task
              </button>
            </form>
          </div>

          {/* Upcoming interviews quick */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
            <h4 className="font-medium text-gray-900 dark:text-white">Upcoming Interviews</h4>
            <ul className="mt-3 space-y-3">
              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/40?img=5" className="rounded-full" alt="natalie" />
                  <div>
                    <div className="font-medium">Natalie Gibson</div>
                    <div className="text-xs text-gray-500">UI/UX Designer</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">1:30 - 2:00</div>
              </li>

              <li className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/40?img=6" className="rounded-full" alt="peter" />
                  <div>
                    <div className="font-medium">Peter Piper</div>
                    <div className="text-xs text-gray-500">Web Designer</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">9:00 - 9:30</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom: Employee list (shows up to 10) */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Employees</h4>
        {loading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : (
          <UserList users={members} />
        )}
      </div>
    </div>
  );
}
