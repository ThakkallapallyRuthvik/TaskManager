import { useState } from 'react';

const Navbar = ({ username, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-800 text-white p-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-xl font-bold">TaskFlow</h1>
      <div className="relative">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 focus:outline-none">
          <span>{username}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg py-2">
            <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">View Profile</button>
            <button onClick={onLogout} className="block px-4 py-2 hover:bg-gray-100 w-full text-left text-red-600">Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;