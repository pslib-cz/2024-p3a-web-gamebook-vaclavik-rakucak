import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ChainElement, Item, Quest } from '../types/ViewModels';
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
  currentQuests: Quest[];
  completedQuests: Quest[];
  updateQuestProgress: (questId: number, progress: number) => void;
  completeQuest: (questId: number) => void;
  checkAndUpdateQuests: (dungeonId: number) => void;
  acceptQuest: (quest: Quest) => void;
  exportGameState: () => void;
  importGameState: (file: File) => void;
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
  const [coins, setCoins] = useState<number>(30);
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
  const [currentQuests, setCurrentQuests] = useState<Quest[]>([]);
  const [completedQuests, setCompletedQuests] = useState<Quest[]>([]);
  const [availableQuests, setAvailableQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const fetchAvailableQuests = async () => {
      try {
        const response = await fetch(`/api/quests`);
        if (!response.ok) {
          throw new Error('Failed to fetch quests');
        }
        const quests: Quest[] = await response.json();
        setAvailableQuests(quests);
      } catch (error) {
        console.error('Error fetching quests:', error);
      }
    };

    fetchAvailableQuests();
  }, []);

  const acceptQuest = (quest: Quest) => {
    setCurrentQuests([quest]);
    quest.progress = 0;
  };

  const completeQuest = (questId: number) => {
    const quest = currentQuests.find((quest) => quest.id === questId);
    if (quest) {
      setCurrentQuests([]);
      setCompletedQuests((prevQuests) => [...prevQuests, quest]);
      // Handle quest rewards here
      if (quest.rewardItemId) {
        // Add reward item to player's inventory
      }
      // Offer the next quest in the sequence
      const nextQuestIndex = availableQuests.findIndex((q) => q.id === questId) + 1;
      if (nextQuestIndex < availableQuests.length) {
        setCurrentQuests([availableQuests[nextQuestIndex]]);
        availableQuests[nextQuestIndex].progress = 0;
      }
    }
  };

  const updateQuestProgress = (questId: number, progress: number) => {
    setCurrentQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === questId ? { ...quest, progress } : quest
      )
    );
  };

  const checkAndUpdateQuests = (number: number) => {
    setCurrentQuests((prevQuests) =>
      prevQuests.map((quest) => {
        if (quest.condition === 'completeDungeon' && quest.dungeonId === number) {
          if (quest.progress < quest.conditionValue) {
            const newProgress = quest.progress + 1;
            return { ...quest, progress: newProgress };
          }
        }
        if (quest.condition === 'killMonster' && quest.monsterId === number) {
          if (quest.progress < quest.conditionValue) {
            const newProgress = quest.progress + .5;
            return { ...quest, progress: newProgress };
          }
        }
        if (quest.condition === 'collectItem' && quest.roomItemId === number) {
          if (quest.progress < quest.conditionValue) {
            const newProgress = quest.progress + 1;
            return { ...quest, progress: newProgress };
          }
        }
        if (quest.condition === 'killBoss' && quest.monsterId === number) {
          if (quest.progress < quest.conditionValue) {
            const newProgress = quest.progress + 1;
            return { ...quest, progress: newProgress };
          }
        }
        return quest;
      })
    );
  };

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

  const exportGameState = () => {
    const gameState = {
      chain,
      currentChainIndex,
      dungeonId,
      playerHealth,
      coins,
      weapon,
      armor,
      shield,
      items,
      defeatedMonsters,
      currentQuests,
      completedQuests,
      availableQuests,
    };
    const gameStateJson = JSON.stringify(gameState);
    const blob = new Blob([gameStateJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gameState.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importGameState = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const gameState = JSON.parse(event.target.result as string);
        setChain(gameState.chain);
        setCurrentChainIndex(gameState.currentChainIndex);
        setDungeonId(gameState.dungeonId);
        setPlayerHealth(gameState.playerHealth);
        setCoins(gameState.coins);
        setWeapon(gameState.weapon);
        setArmor(gameState.armor);
        setShield(gameState.shield);
        setItems(gameState.items);
        setDefeatedMonsters(gameState.defeatedMonsters);
        setCurrentQuests(gameState.currentQuests);
        setCompletedQuests(gameState.completedQuests);
        setAvailableQuests(gameState.availableQuests);
      }
    };
    reader.readAsText(file);
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
    currentQuests,
    completedQuests,
    updateQuestProgress,
    completeQuest,
    checkAndUpdateQuests, 
    acceptQuest,
    exportGameState,
    importGameState,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};