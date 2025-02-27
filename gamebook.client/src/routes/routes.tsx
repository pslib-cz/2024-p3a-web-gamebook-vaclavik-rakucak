import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MenuPage from '../pages/MenuPage/MenuPage';
import DungeonPage from '../pages/DungeonPage/DungeonPage.tsx';
import Login from '../components/Admin/Login/Login';
import AdminPanel from '../components/Admin/AdminPanel/AdminPanel';
import MainMapPage from '../pages/MapPage/MapPage.tsx';
import TownPage from '../pages/TownPage/TownPage';
import TavernPage from '../pages/TavernPage/TavernPage';
import ShopPage from '../pages/ShopPage/ShopPage';
import InventoryButton from '../components/Inventory/InventoryButton';
import CoinAndHealthBar from '../components/StatusCard/CoinAndHealthBar.tsx';
import Burgir from '../components/Burgir/Burgir';
import PauseMenu from '../components/PauseMenu/PauseMenu.tsx';
import TextPage from '../pages/TextPage/TextPage';
import { useState } from 'react';

interface RoutesProps {
  token: string;
  role: string;
  onLogin: (token: string, role: string) => void;
}

const AppRoutes: React.FC<RoutesProps> = ({ token, role, onLogin }) => {
  const location = useLocation();
  const hide = location.pathname === '/Town/Tavern' 
            || location.pathname === '/Login'
            || location.pathname === '/AdminPanel'
            || location.pathname === '/';
  const hideMenu = location.pathname === '/Login' || location.pathname === '/AdminPanel';
  const [isPauseMenuOpen, setIsPauseMenuOpen] = useState<boolean>(false);
  const togglePauseMenu = () => {
    setIsPauseMenuOpen((prev) => !prev);
  };

  return (
    <>
      {!hide && <CoinAndHealthBar />}
      {!hide && <InventoryButton />}
      {!hideMenu && 
        <div style={{ position: 'absolute', top: '0', right: '0', zIndex: 100 }}>
          <Burgir onClick={togglePauseMenu} isOpen={isPauseMenuOpen}/>
        </div>
      }
      {isPauseMenuOpen && <PauseMenu onClose={togglePauseMenu}/>}
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/Map" element={<MainMapPage />} />
        <Route path="/Dungeon/:dungeonId/:type/:index" element={<DungeonPage />} />
        <Route path="/Login" element={<Login onLogin={onLogin} />} />
        <Route path='/Town' element={<TownPage />} />
        <Route path='/Town/Tavern' element={<TavernPage />} />
        <Route path='/Town/Blacksmith' element={<ShopPage />} />
        <Route path="/Prologue" element={<TextPage />} />
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
    </>
  );
};

export default AppRoutes;