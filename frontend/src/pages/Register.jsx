import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {toast} from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
            login(data.user, data.token);
            toast.success("Account created successfully!"); // <--- SUCCESS
            navigate('/dashboard');
        } else {
            toast.error(data.msg || "Registration failed"); // <--- ERROR
        }
    }catch(error){
        toast.error("Email already exists, please use another email");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-slate-800">Join TaskFlow</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Username" className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, username: e.target.value})} required />
          <input type="email" placeholder="Email" className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input type="password" placeholder="Password" className="w-full border border-slate-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        </div>
        <button className="w-full bg-blue-600 text-white font-bold p-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">Create Account</button>
        <p className="text-sm text-center text-slate-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline font-semibold">Login here</Link></p>
      </form>
    </div>
  );
};
export default Register;