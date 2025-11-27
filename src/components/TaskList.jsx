import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskProgress, completeTask } from '../redux/slices/membersSlice';

export default function TaskList({ member }) {
  const dispatch = useDispatch();

  if (!member) return <div>No member selected</div>;

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Tasks for {member.name}</h3>
      <div className="space-y-2">
        {(member.tasks || []).map(t => (
          <div key={t.id} className="bg-white p-3 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-xs text-gray-500">Due: {t.dueDate || '—'}</div>
              </div>

              <div className="text-sm">
                <div className="mb-2">Progress: {t.progress}%</div>
                <div className="flex gap-2">
                  <button onClick={() => dispatch(updateTaskProgress({ memberId: member.id, taskId: t.id, delta: -10 }))} className="px-2 py-1 border rounded">-10%</button>
                  <button onClick={() => dispatch(updateTaskProgress({ memberId: member.id, taskId: t.id, delta: 10 }))} className="px-2 py-1 border rounded">+10%</button>
                  <button onClick={() => dispatch(completeTask({ memberId: member.id, taskId: t.id }))} className="px-2 py-1 border rounded">Complete</button>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div style={{width: `${t.progress}%`}} className={`h-2 rounded ${t.completed ? 'bg-green-600' : 'bg-indigo-500'}`}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {member.tasks.length === 0 && <div className="text-gray-500">No tasks assigned.</div>}
      </div>
    </div>
  );
}
