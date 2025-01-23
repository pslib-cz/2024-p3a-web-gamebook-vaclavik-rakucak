import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ChainItemDto } from '../types/RoomDto';
import { saveDataToLocalStorage, getDataFromLocalStorage } from '../utils/LocalStorage'; // Importujte funkce pro práci s localStorage

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
  coins: number;
  setCoins: (coins: number) => void;
  changeCoins: (amount: number) => void;
  changeHealth: (amount: number) => void;
  defeatedMonsters: number[]; // Přidáno pro ukládání poražených monster
  setDefeatedMonsters: (monsters: number[]) => void; // Přidáno pro nastavení poražených monster
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
  const [playerHealth, setPlayerHealth] = useState<number>(100);
  const [coins, setCoins] = useState<number>(100);
  const maxPlayerHealth = 100;
  const [defeatedMonsters, setDefeatedMonsters] = useState<number[]>(() => {
    const storedDefeatedMonsters = dungeonId ? getDataFromLocalStorage<number[]>(`defeatedMonsters_${dungeonId}`) : [];
    return storedDefeatedMonsters || [];
  });

  const changeCoins = (amount: number) => {
    setCoins(prevCoins => Math.max(0, prevCoins + amount));
  };

  const changeHealth = (amount: number) => {
    setPlayerHealth(prevHealth => Math.min(maxPlayerHealth, Math.max(0, prevHealth + amount)));
  };

  useEffect(() => {
    if (dungeonId) {
      saveDataToLocalStorage(`defeatedMonsters_${dungeonId}`, defeatedMonsters);
    }
  }, [defeatedMonsters, dungeonId]);

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
    coins,
    setCoins,
    changeCoins,
    changeHealth,
    defeatedMonsters,
    setDefeatedMonsters,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};