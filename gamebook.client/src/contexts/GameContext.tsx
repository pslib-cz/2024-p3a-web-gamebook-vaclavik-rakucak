import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ChainItemDto } from '../types/RoomDto';

interface GameContextProps {
  chain: ChainItemDto[] | null;
  setChain: (chain: ChainItemDto[] | null) => void;
  currentChainIndex: number;
  setCurrentChainIndex: (index: number) => void;
  dungeonId: string | undefined;
  setDungeonId: (dungeonId: string | undefined) => void;
  playerHealth: number;
  setPlayerHealth: (health: number) => void;
  maxPlayerHealth: number;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [chain, setChain] = useState<ChainItemDto[] | null>(null);
  const [currentChainIndex, setCurrentChainIndex] = useState<number>(0);
  const [dungeonId, setDungeonId] = useState<string | undefined>(undefined);
  const [playerHealth, setPlayerHealth] = useState<number>(100); // Počáteční zdraví
  const maxPlayerHealth = 100; // Maximální zdraví

  const value: GameContextProps = {
    chain,
    setChain,
    currentChainIndex,
    setCurrentChainIndex,
    dungeonId,
    setDungeonId,
    playerHealth,
    setPlayerHealth,
    maxPlayerHealth,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};