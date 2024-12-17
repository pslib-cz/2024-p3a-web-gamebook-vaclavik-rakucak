import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuPage from './pages/MenuPage/MenuPage';
import SetNamePage from './pages/SetNamePage/SetNamePage';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/set-name" element={<SetNamePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
