import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MenuPage from '../pages/MenuPage/MenuPage';
import DungeonPage from '../pages/DungeonPage/DungeonPage.tsx';
import Login from '../components/Admin/Login/Login';
import AdminPanel from '../components/Admin/AdminPanel/AdminPanel';
import MainMapPage from '../pages/MapPage/MapPage.tsx'
import TownPage from '../pages/TownPage/TownPage';
import TavernPage from '../pages/TavernPage/TavernPage';
import ShopPage from '../pages/ShopPage/ShopPage';

interface RoutesProps {
  token: string;
  role: string;
  onLogin: (token: string, role: string) => void;
}

const AppRoutes: React.FC<RoutesProps> = ({ token, role, onLogin }) => {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/Map" element={<MainMapPage />} />
      <Route path="/Dungeon/:dungeonId/:type/:index" element={<DungeonPage />} />
      <Route path="/Login" element={<Login onLogin={onLogin} />} />
      <Route path='/Town' element={<TownPage />} />
      <Route path='/Tavern' element={<TavernPage />} />
      <Route path='/Blacksmith' element={<ShopPage />} />
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