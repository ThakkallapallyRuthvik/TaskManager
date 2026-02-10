import React, { useState, useEffect } from 'react';
import {toast} from 'react-hot-toast';

const TaskModal = ({ task, onClose, onSave }) => {
  const [formData, setFormData] = useState({ 
    title: '', description: '', deadline: '', status: 'pending' 
  });

  // Load task data if editing
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        deadline: task.deadline.split('T')[0],
        status: task.status
      });
    }
  }, [task]);

  const getTodayString = () => new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const selectedDate = new Date(formData.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.error("Deadline cannot be in the past!");
      return;
    }

    const token = localStorage.getItem('token');
    const url = task 
      ? `http://localhost:5000/api/tasks/${task._id}` 
      : 'http://localhost:5000/api/tasks';
    const method = task ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSave(); // Refresh parent list
        onClose();
        toast.success(task ? "Task updated!" : "New task created!");
      }
    } catch (err) {
      toast.error("Failed to save task", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-96 animate-fade-in-up">
        <h3 className="text-xl font-bold mb-4 text-slate-800">
          {task ? 'Edit Task' : 'Create New Task'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Title</label>
            <input 
              className="w-full border p-2 rounded-lg mt-1" 
              placeholder="e.g. Finish Project" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
            <textarea 
              className="w-full border p-2 rounded-lg mt-1" 
              placeholder="Details..." 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
               <label className="text-xs font-bold text-slate-500 uppercase">Deadline</label>
               <input 
                type="date" 
                className="w-full border p-2 rounded-lg mt-1" 
                value={formData.deadline}
                min={getTodayString()} 
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
              <select 
                className="w-full border p-2 rounded-lg mt-1 bg-white"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {task ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;