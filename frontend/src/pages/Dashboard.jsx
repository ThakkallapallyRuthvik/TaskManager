import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';

// Import Modular Components
import TaskTable from '../components/TaskTable';
import TaskModal from '../components/TaskModal';
import ProfileModal from '../components/ProfileModal';

const Dashboard = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();

  // State Management
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // UI State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  // Editing State
  const [editingTask, setEditingTask] = useState(null); 

  // --- LOGIC ---
  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setTasks(await res.json());
    } catch (err) {
      console.error("Failed to fetch tasks");
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this task?")) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
        toast.success("Task deleted"); // <--- SUCCESS POPUP
        fetchTasks();
    } else {
        toast.error("Could not delete task");
    }
    fetchTasks();
  };

  // Handlers
  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleCreateClick = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleProfileUpdate = (updatedData) => {
    login(updatedData, localStorage.getItem('token'));
  };

  // Filtering
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <nav className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight">TaskFlow</h1>
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)} 
            className="flex items-center gap-2 text-slate-700 font-medium hover:text-blue-600 transition"
          >
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
              {user?.username?.charAt(0).toUpperCase()}
            </div>
            <span>{user?.username}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-2 overflow-hidden z-20">
              <button onClick={() => { setShowProfileModal(true); setIsProfileOpen(false); }} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700">
                Edit Profile
              </button>
              <div className="border-t border-slate-100 my-1"></div>
              <button onClick={() => { logout(); navigate('/login'); }} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600">
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto p-6 mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">Your Tasks</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search tasks..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg w-full md:w-[400px] focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>

            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <button 
              onClick={handleCreateClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>+</span> New Task
            </button>
          </div>
        </div>

        {/* MODULAR TABLE */}
        <TaskTable 
          tasks={filteredTasks} 
          onEdit={handleEditClick} 
          onDelete={handleDelete} 
        />
      </main>

      {/* MODULAR MODALS */}
      {showTaskModal && (
        <TaskModal 
          task={editingTask} 
          onClose={() => setShowTaskModal(false)} 
          onSave={fetchTasks} 
        />
      )}

      {showProfileModal && (
        <ProfileModal 
          user={user} 
          onClose={() => setShowProfileModal(false)} 
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;