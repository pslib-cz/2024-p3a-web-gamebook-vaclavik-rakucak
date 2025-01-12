// src/routes/routes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MenuPage from '../pages/MenuPage/MenuPage';
import SetNamePage from '../pages/SetNamePage/SetNamePage';
import RoomPage from '../pages/RoomPage/RoomPage';
import Login from '../components/Admin/Login/Login';
import AdminPanel from '../components/Admin/AdminPanel/AdminPanel';

interface RoutesProps {
  token: string;
  role: string;
  onLogin: (token: string, role: string) => void;
}

const AppRoutes: React.FC<RoutesProps> = ({ token, role, onLogin }) => {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/set-name" element={<SetNamePage />} />
      <Route path="/room" element={<RoomPage />} />
      <Route path="/login" element={<Login onLogin={onLogin} />} />
      <Route
        path="/AdminPanel"
        element={
          token && role === 'admin' ? (
            <AdminPanel token={token} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;