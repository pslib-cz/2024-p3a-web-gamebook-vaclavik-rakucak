// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/routes';
import { GameProvider } from './contexts/GameContext';

const App: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const handleLogin = (token: string, role: string) => {
    setToken(token);
    setRole(role);
  };

  return (
    <BrowserRouter>
      <GameProvider>
        < AppRoutes token={token} role={role} onLogin={handleLogin} />
        </GameProvider>
    </BrowserRouter>
  );
};

export default App;