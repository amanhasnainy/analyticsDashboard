// src/components/manager/UserList.jsx
import React from "react";
import Skeleton from "../ui/Skeleton";
import { useSelector } from "react-redux";

export default function UserList({ users }) {
  const members = useSelector((s) => s.members.list);
  const loading = useSelector((s) => s.members.loading);

  const list = users?.length ? users : members;

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
        <Skeleton className="h-14 w-full rounded-xl" />
      </div>
    );
  }

  if (!list.length) {
    return <p className="text-gray-500">No employees found.</p>;
  }

  return (
    <div className="space-y-3">
      {list.map((u) => (
        <div
          key={u.id}
          className="flex items-center justify-between p-3 border rounded-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          {/* LEFT: Avatar + Info */}
          <div className="flex items-center gap-3">
            <img
              src={u.image}
              alt={u.firstName}
              className="w-12 h-12 rounded-full object-cover shadow"
            />

            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">
                {u.firstName} {u.lastName}
              </div>
              <div className="text-xs text-gray-500">{u.email}</div>
              <div className="text-xs text-gray-400">
                Tasks: {u.tasks?.length || 0}
              </div>
            </div>
          </div>

          {/* STATUS BADGE */}
          <span
            className={`px-3 py-1 text-xs rounded-full font-medium
              ${
                u.status === "Working"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                  : u.status === "Break"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                  : u.status === "Meeting"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }
            `}
          >
            {u.status}
          </span>
        </div>
      ))}
    </div>
  );
}
