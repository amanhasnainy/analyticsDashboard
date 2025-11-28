// src/components/EmployeeView.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TaskList from "../TaskList";
import StatusSelector from "../StatusSelector";

export default function EmployeeView() {
  const userName = useSelector((s) => s.role.currentUser);
  const members = useSelector((s) => s.members.list);

  const me =
    members.find((m) => `${m.firstName} ${m.lastName}` === userName) ||
    members[0] ||
    {};

  const [clockedIn, setClockedIn] = useState(false);

  // Calculate average progress
  const myTasks = me.tasks || [];
  const progress =
    myTasks.length > 0
      ? Math.round(
          myTasks.reduce((acc, t) => acc + t.progress, 0) / myTasks.length
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="card flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src={me.image}
            className="w-16 h-16 rounded-full shadow"
            alt=""
          />
          <div>
            <h2 className="text-lg font-semibold">
              {me.firstName} {me.lastName}
            </h2>
            <p className="text-sm text-gray-500">{me.email || "—"}</p>
          </div>
        </div>

        <button
          onClick={() => setClockedIn(!clockedIn)}
          className={`px-4 py-2 rounded-lg text-white ${
            clockedIn ? "bg-red-500" : "bg-primary"
          }`}
        >
          {clockedIn ? "Clock Out" : "Clock In"}
        </button>
      </div>

      {/* Status Selector */}
      <div className="card">
        <h3 className="font-semibold mb-3">Your Status</h3>
        <StatusSelector current={me.status || "Offline"} />
      </div>

      {/* Tasks */}
      <div className="card">
        <h3 className="font-semibold mb-3">Your Tasks</h3>
        <TaskList member={me} />
      </div>

      {/* Daily Progress */}
      <div className="card">
        <h3 className="font-semibold">Today's Progress</h3>
        <div className="mt-3">
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
            <div
              className="h-3 rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{progress}% completed</p>
        </div>
      </div>

      {/* Notifications */}
      <div className="card">
        <h3 className="font-semibold mb-3">Notifications</h3>
        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <li>• Daily standup at 10:00 AM.</li>
          <li>• New message from HR.</li>
          <li>• One task marked as completed.</li>
        </ul>
      </div>
    </div>
  );
}
