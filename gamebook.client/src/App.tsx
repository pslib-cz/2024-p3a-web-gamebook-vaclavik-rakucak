import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage/MenuPage';
import SetNamePage from './pages/SetNamePage/SetNamePage';
import MainMapPage from './pages/MainMapPage/MainMapPage'
import RoomViewer from './components/RoomViewer'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/set-name" element={<SetNamePage />} />
                <Route path="/RoomViewer" element={<RoomViewer />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
