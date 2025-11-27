import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignTask } from '../redux/slices/membersSlice';
import { v4 as uuidv4 } from 'uuid';

export default function TaskForm() {
  const members = useSelector(s => s.members.list);
  const dispatch = useDispatch();
  const [memberId, setMemberId] = useState(members[0]?.id || '');
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  React.useEffect(() => {
    if (!memberId && members.length) setMemberId(members[0].id);
  }, [members, memberId]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!memberId || !title) return alert('Select member and enter title');
    const task = {
      id: uuidv4(),
      title,
      dueDate,
      progress: 0,
      completed: false
    };
    dispatch(assignTask({ memberId, task }));
    setTitle('');
    setDueDate('');
  };

  return (
    <form onSubmit={onSubmit} className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="font-medium">Assign Task</h3>
      <div>
        <label className="text-xs">Member</label>
        <select value={memberId} onChange={e => setMemberId(e.target.value)} className="w-full mt-1 p-2 border rounded">
          {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs">Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="Task title" />
      </div>

      <div>
        <label className="text-xs">Due date</label>
        <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </div>

      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Assign</button>
    </form>
  );
}
