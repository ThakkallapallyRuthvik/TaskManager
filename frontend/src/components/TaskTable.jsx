import React from 'react';

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  
  // Helper for date formatting
  const formatDate = (dateString) => {
    if (!dateString) return 'No Date';
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500 text-lg">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 font-semibold text-slate-600 text-sm uppercase">S.No</th>
            <th className="p-4 font-semibold text-slate-600 text-sm uppercase">Task</th>
            <th className="p-4 font-semibold text-slate-600 text-sm uppercase">Deadline</th>
            <th className="p-4 font-semibold text-slate-600 text-sm uppercase">Status</th>
            <th className="p-4 font-semibold text-slate-600 text-sm uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tasks.map((task, index) => (
            <tr key={task._id} className="hover:bg-slate-50 transition">
              <td className="p-4 text-slate-500">{index + 1}</td>
              <td className="p-4">
                <p className="font-medium text-slate-900">{task.title}</p>
                <p className="text-xs text-slate-500 truncate max-w-xs">{task.description}</p>
              </td>
              <td className="p-4 text-slate-600 text-sm">
                {formatDate(task.deadline)}
              </td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {task.status}
                </span>
              </td>
              <td className="p-4 text-right flex justify-end gap-3">
                {/* EDIT ICON */}
                <button onClick={() => onEdit(task)} className="text-slate-400 hover:text-blue-600 transition" title="Edit">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                </button>
                {/* DELETE ICON */}
                <button onClick={() => onDelete(task._id)} className="text-slate-400 hover:text-red-600 transition" title="Delete">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;