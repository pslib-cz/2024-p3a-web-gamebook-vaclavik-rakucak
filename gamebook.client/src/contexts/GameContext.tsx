// src/contexts/GameContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ChainItemDto } from '../types/RoomDto';

interface GameContextProps {
  chain: ChainItemDto[] | null;
  setChain: (chain: ChainItemDto[] | null) => void;
  currentChainIndex: number;
  setCurrentChainIndex: (index: number) => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chain, setChain] = useState<ChainItemDto[] | null>(null);
  const [currentChainIndex, setCurrentChainIndex] = useState<number>(0);

  const value: GameContextProps = {
    chain,
    setChain,
    currentChainIndex,
    setCurrentChainIndex,
    // ...
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};