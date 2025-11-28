// src/components/TaskForm.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { assignTask } from "../redux/slices/membersSlice";
import { v4 as uuidv4 } from "uuid";

export default function TaskForm() {
  const dispatch = useDispatch();
  const members = useSelector((s) => s.members.list);

  const [memberId, setMemberId] = useState("");
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (members.length && !memberId) setMemberId(members[0].id);
  }, [members]);

  const submit = (e) => {
    e.preventDefault();
    if (!title || !memberId) return;

    const task = {
      id: uuidv4(),
      title,
      dueDate,
      progress: 0,
      completed: false,
    };

    dispatch(assignTask({ memberId: Number(memberId), task }));

    setTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={submit} className="space-y-3">

      {/* MEMBER SELECTION */}
      <select
  value={memberId}
  onChange={(e) => setMemberId(Number(e.target.value))}
  className="
    w-full p-2 border rounded
    text-black dark:text-black
    bg-white dark:bg-gray-600
    !text-black
    [&>*]:!text-black
    [&>*]:bg-white
  "
>
        {members.map((m) => (
          <option key={m.id} value={m.id}>
            {m.firstName} {m.lastName}
          </option>
        ))}
      </select>

      {/* TASK TITLE */}
      <input
        type="text"
        placeholder="Task title"
        className="
          w-full p-2 border rounded
          text-black dark:text-black
          placeholder-gray-500
          bg-white dark:bg-gray-600
        "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* DUE DATE */}
      <input
        type="date"
        className="
          w-full p-2 border rounded
          text-black dark:text-black
          bg-white dark:bg-gray-600
        "
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="w-full py-2 bg-primary text-white rounded"
      >
        Assign Task
      </button>
    </form>
  );
}
