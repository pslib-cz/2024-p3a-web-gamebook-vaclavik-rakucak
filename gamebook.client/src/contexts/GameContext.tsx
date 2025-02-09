import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ChainElement, Item } from '../types/ViewModels';
import { saveDataToLocalStorage, getDataFromLocalStorage } from '../utils/LocalStorage';

interface GameContextProps {
  chain: ChainElement[] | null;
  setChain: (chain: ChainElement[] | null) => void;
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
  defeatedMonsters: number[];
  setDefeatedMonsters: (monsters: number[]) => void;
  weapon: Item | null;
  setWeapon: (weapon: Item | null) => void;
  armor: Item | null;
  setArmor: (armor: Item | null) => void;
  shield: Item | null;
  setShield: (shield: Item | null) => void;
  items: Item[];
  setItems: (items: Item[]) => void;
  handleUnEquipItem: (item: Item) => void;
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
  const [chain, setChain] = useState<ChainElement[] | null>(null);
  const [currentChainIndex, setCurrentChainIndex] = useState<number>(0);
  const [dungeonId, setDungeonId] = useState<string | undefined>(undefined);
  const [playerHealth, setPlayerHealth] = useState<number>(100);
  const [coins, setCoins] = useState<number>(1000);
  const maxPlayerHealth = 100;
  const [weapon, setWeapon] = useState<Item | null>(null);
  const [armor, setArmor] = useState<Item | null>(null);
  const [shield, setShield] = useState<Item | null>(null);
  const [items, setItems] = useState<Item[]>(() => {
    const storedItems = sessionStorage.getItem('backpackItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });
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

  useEffect(() => {
    sessionStorage.setItem('backpackItems', JSON.stringify(items));
  }, [items]);

  const handleUnEquipItem = (item: Item) => {
    if (item.type === 'Weapon') {
      setWeapon(null);
    } else if (item.type === 'Shield') {
      setShield(null);
    } else if (item.type === 'Armor') {
      setArmor(null);
    }
    const updatedItems = [...items, item];
    setItems(updatedItems);
    sessionStorage.setItem('backpackItems', JSON.stringify(updatedItems));
  };

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
    weapon,
    setWeapon,
    armor,
    setArmor,
    shield,
    setShield,
    items,
    setItems,
    handleUnEquipItem,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};