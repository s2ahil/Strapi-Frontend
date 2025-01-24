import React, { useState } from 'react';
import Auth from './components/Auth';
import Chat from './components/Chat';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (userData) => {
    setUser(userData);
    console.log("user",user)
    setToken(localStorage.getItem('token'));a
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <div>
      {!token ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <div>
          <button 
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
          <Chat user={user} />
        </div>
      )}
    </div>
  );
}

export default App;