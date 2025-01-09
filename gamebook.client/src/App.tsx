import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MenuPage from './pages/MenuPage/MenuPage';
import SetNamePage from './pages/SetNamePage/SetNamePage';
import Room from './components/Room/Room';
import Login from './components/Admin/Login';
import AdminPanel from './components/Admin/AdminPanel';

const App: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const handleLogin = (token: string, role: string) => {
    setToken(token);
    setRole(role);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/set-name" element={<SetNamePage />} />
        <Route path="/Room" element={<Room />} />
        <Route 
          path="/Login" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route
          path="/AdminPanel"
          element={
            token && role === 'admin' ? (
              <AdminPanel token={token} />
            ) : (
              <Navigate to="/Login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;