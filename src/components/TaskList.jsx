// src/components/TaskList.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { updateTaskProgress } from "../redux/slices/membersSlice";

export default function TaskList({ member }) {
  const dispatch = useDispatch();

  if (!member) return <p>No tasks available.</p>;

  const tasks = member.tasks || [];

  return (
    <div className="space-y-3">
      {tasks.length === 0 && (
        <p className="text-gray-500 text-sm">No tasks assigned yet.</p>
      )}

      {tasks.map((t) => (
        <div
          key={t.id}
          className="p-3 border rounded-lg flex justify-between items-center"
        >
          <div>
            <div className="font-medium">{t.title}</div>
            <div className="text-xs text-gray-500">
              Due: {t.dueDate || "—"}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm">{t.progress}%</span>

            <button
              onClick={() =>
                dispatch(
                  updateTaskProgress({
                    memberId: member.id,
                    taskId: t.id,
                    delta: -10,
                  })
                )
              }
              className="px-2 py-1 border rounded"
            >
              -
            </button>
            <button
              onClick={() =>
                dispatch(
                  updateTaskProgress({
                    memberId: member.id,
                    taskId: t.id,
                    delta: 10,
                  })
                )
              }
              className="px-2 py-1 border rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
