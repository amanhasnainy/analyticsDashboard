import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchRole, setUser } from '../redux/slices/roleSlice';

export default function Header() {
  const dispatch = useDispatch();
  const { currentRole, currentUser } = useSelector(state => state.role);

  const toggleRole = () => {
    dispatch(switchRole(currentRole === 'member' ? 'lead' : 'member'));
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">Team Pulse</h1>
        <p className="text-sm text-gray-500">Monitor & assign tasks</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-medium">{currentUser}</div>
          <div className="text-xs text-gray-500">{currentRole === 'lead' ? 'Team Lead' : 'Team Member'}</div>
        </div>

        <button
          onClick={toggleRole}
          className="px-3 py-1 rounded bg-indigo-600 text-white text-sm"
          title="Toggle role"
        >
          Switch to {currentRole === 'member' ? 'Lead' : 'Member'}
        </button>
      </div>
    </header>
  );
}
