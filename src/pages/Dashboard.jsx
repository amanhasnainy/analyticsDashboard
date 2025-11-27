// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers } from '../redux/slices/membersSlice';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import StatusSelector from '../components/StatusSelector';

const demoLineData = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 40 },
  { name: 'Mar', value: 35 },
  { name: 'Apr', value: 50 },
  { name: 'May', value: 45 },
  { name: 'Jun', value: 30 },
];

export default function Dashboard() {
  const dispatch = useDispatch();
  const membersState = useSelector(s => s.members);
  const roleState = useSelector(s => s.role);

  useEffect(() => {
    // fetch demo members (slice should handle async thunk)
    dispatch(fetchMembers());
  }, [dispatch]);

  const counts = { Working:0, Meeting:0, Break:0, Offline:0 };
  membersState.list.forEach(m => counts[m.status] = (counts[m.status]||0) + 1);
  const pieData = [
    { name: 'Men', value: Math.max(1, Math.round((membersState.list.length || 4) * 0.6)) },
    { name: 'Women', value: Math.max(1, Math.round((membersState.list.length || 4) * 0.4)) },
  ];
  const COLORS = ['#ff6b6b', '#7dd3fc'];

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 space-y-6">
          {/* Top row: Line chart + right widget */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-4 rounded shadow">
              <h3 className="font-medium mb-2">Employees Info</h3>
              <div style={{height:210}}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={demoLineData}>
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#fb7185" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-indigo-700 text-white p-4 rounded shadow flex flex-col justify-between">
              <div>
                <div className="text-sm">Applications</div>
                <div className="text-3xl font-bold">1546</div>
              </div>

              <div className="mt-4">
                <div className="bg-white/10 p-3 rounded mb-2">Interviews: <span className="font-semibold">246</span></div>
                <div className="bg-white/10 p-3 rounded">Hired: <span className="font-semibold">101</span></div>
              </div>
            </div>
          </div>

          {/* Middle row: availability cards + pie chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-medium mb-2">Employees Availability</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border rounded">
                    <div className="text-xs text-gray-500">Attendance</div>
                    <div className="text-xl font-bold">400</div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="text-xs text-gray-500">Late Coming</div>
                    <div className="text-xl font-bold">17</div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="text-xs text-gray-500">Absent</div>
                    <div className="text-xl font-bold">06</div>
                  </div>
                  <div className="p-3 border rounded">
                    <div className="text-xs text-gray-500">Leave Apply</div>
                    <div className="text-xl font-bold">14</div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Total Employees</h4>
                  <div className="font-bold">{membersState.list.length || 0}</div>
                </div>
                <div style={{ height: 180 }} className="mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} innerRadius={50} outerRadius={70} dataKey="value">
                        {pieData.map((entry, idx) => <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-xs mt-2 flex gap-3">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-pink-400 rounded-full"></span> Men</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-sky-300 rounded-full"></span> Women</div>
                </div>
              </div>
            </div>

            {/* Right column: upcoming interviews */}
            <div className="space-y-4">
              <div className="bg-white p-4 rounded shadow">
                <h4 className="font-medium">Upcoming Interviews</h4>
                <ul className="mt-3 space-y-3">
                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src="https://i.pravatar.cc/40?img=5" alt="" className="rounded-full" />
                      <div>
                        <div className="font-medium">Natalie Gibson</div>
                        <div className="text-xs text-gray-500">UI/UX Designer</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">1:30 - 1:30</div>
                  </li>

                  <li className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src="https://i.pravatar.cc/40?img=6" alt="" className="rounded-full" />
                      <div>
                        <div className="font-medium">Peter Piperg</div>
                        <div className="text-xs text-gray-500">Web Designer</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">9:00 - 1:30</div>
                  </li>
                </ul>
              </div>

              {/* Depending on role show Lead / Member widgets */}
              <div className="bg-white p-4 rounded shadow">
                {roleState.currentRole === 'lead' ? (
                  <div>
                    <TaskForm />
                  </div>
                ) : (
                  <div>
                    <h4 className="font-medium">Your Status</h4>
                    <div className="mt-2">
                      <StatusSelector current={membersState.list.find(m=>m.name===roleState.currentUser)?.status || 'Offline'} onChange={(s)=> {/* dispatch setStatus in slice */}} />
                    </div>

                    <div className="mt-4">
                      <TaskList member={membersState.list.find(m=>m.name===roleState.currentUser)} />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
