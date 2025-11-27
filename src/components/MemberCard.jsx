import React from 'react';

function StatusBadge({ status }) {
  const colors = {
    Working: 'bg-green-100 text-green-800',
    Break: 'bg-yellow-100 text-yellow-800',
    Meeting: 'bg-blue-100 text-blue-800',
    Offline: 'bg-gray-100 text-gray-700'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[status] || colors.Offline}`}>
      {status}
    </span>
  );
}

export default function MemberCard({ member, onOpen }) {
  const activeTasks = (member.tasks || []).filter(t => !t.completed).length;
  return (
    <div className="bg-white p-3 rounded shadow flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <img src={member.avatar} alt="" className="w-10 h-10 rounded-full" />
        <div>
          <div className="font-medium">{member.name}</div>
          <div className="text-xs text-gray-500">{activeTasks} active task(s)</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <StatusBadge status={member.status} />
        <button onClick={() => onOpen(member)} className="text-sm px-2 py-1 rounded border">Open</button>
      </div>
    </div>
  );
}
