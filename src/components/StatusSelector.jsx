// src/components/StatusSelector.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/slices/membersSlice";

const STATUS = ["Working", "Break", "Meeting", "Offline"];

export default function StatusSelector({ current }) {
  const dispatch = useDispatch();
  const members = useSelector((s) => s.members.list);
  const userName = useSelector((s) => s.role.currentUser);

  const me = members.find(
    (m) => `${m.firstName} ${m.lastName}` === userName
  );

  return (
    <div className="flex gap-2 flex-wrap">
      {STATUS.map((s) => (
        <button
          key={s}
          onClick={() =>
            dispatch(setStatus({ memberId: me.id, status: s }))
          }
          className={`px-3 py-1 rounded-md text-sm ${
            s === current
              ? "bg-primary text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
