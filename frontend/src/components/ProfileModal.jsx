import React, { useState } from 'react';
import {toast} from 'react-hot-toast'

const ProfileModal = ({ user, onClose, onUpdate }) => {
  const [form, setForm] = useState({ 
    username: user?.username || '', 
    email: user?.email || '',
    password: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        onUpdate(data); // Update global state in parent
        toast.success("Profile updated successfully!");
        onClose();
      } else {
        toast.error(data.msg || "Update failed.");
      }
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-96">
        <h3 className="text-xl font-bold mb-4 text-slate-800">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Username</label>
            <input 
              className="w-full border p-2 rounded-lg mt-1" 
              value={form.username}
              onChange={(e) => setForm({...form, username: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input 
              className="w-full border p-2 rounded-lg mt-1 bg-slate-100" 
              value={form.email}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">New Password</label>
            <input 
              type="password"
              placeholder="Leave blank to keep current"
              className="w-full border p-2 rounded-lg mt-1" 
              value={form.password}
              onChange={(e) => setForm({...form, password: e.target.value})}
            />
          </div>
          <div className="flex gap-2 justify-end mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;