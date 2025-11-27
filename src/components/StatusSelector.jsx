import React from 'react';

const statuses = ['Working','Break','Meeting','Offline'];

export default function StatusSelector({ current, onChange }) {
  return (
    <div className="flex gap-2">
      {statuses.map(s => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-3 py-1 rounded text-sm border ${
            current === s ? 'bg-indigo-600 text-white' : 'bg-white'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
