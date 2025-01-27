import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameContext } from '../../contexts/GameContext';
import ChainViewer from '../../components/DungeonStructure/ChainViewer/ChainViewer';
import { ChainElement } from '../../types/RoomDto';

const DungeonPage: React.FC = () => {
  const { dungeonId, type, index } = useParams<{ dungeonId?: string; type?: string; index?: string }>();
  const { chain, setChain, currentChainIndex, setCurrentChainIndex, setDungeonId, playerHealth, setPlayerHealth, setCoins, setDefeatedMonsters } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!dungeonId) {
          throw new Error('Dungeon ID is missing.');
        }
        setDungeonId(dungeonId);

        // Načtení chainu z API, pokud není v GameContextu
        if (!chain || chain.length === 0) {
          const response = await fetch(`https://localhost:7190/DungeonChain/${dungeonId}`);

          if (!response.ok) {
            throw new Error(`Failed to fetch dungeon data: ${response.statusText}`);
          }

          const apiData: ChainElement[] = await response.json();
          setChain(apiData);
        }

      } catch (error) {
        console.error('Error fetching or processing dungeon data:', error);
        navigate('/');
      }
    };

    if (dungeonId) {
      fetchData();
    }
  }, [dungeonId, setChain, navigate, setDungeonId]);

  useEffect(() => {
    // Nastavení indexu z URL, pokud je chain k dispozici
    if (chain && index !== undefined && type) {
      const newIndex = parseInt(index, 10);
      if (newIndex >= 0 && newIndex < chain.length) {
        setCurrentChainIndex(newIndex);
      } else {
        setCurrentChainIndex(0); // Fallback na 0, pokud je index mimo rozsah
      }
    }
  }, [chain, index, type, setCurrentChainIndex]);

  useEffect(() => {
    // Udržování URL v synchronizaci s GameContextem
    if (dungeonId && chain && currentChainIndex >= 0 && currentChainIndex < chain.length) {
      const currentItem = chain[currentChainIndex];
      const newType = currentItem.type;
      const newIndex = currentChainIndex;

      if (type !== newType || index !== newIndex.toString()) {
        navigate(`/Dungeon/${dungeonId}/${newType}/${newIndex}`, { replace: true });
      }
    }
  }, [dungeonId, chain, currentChainIndex, navigate, type, index]);

    useEffect(() => {
        const initializeGame = () => {
            setPlayerHealth(100);
            setCoins(100);
            setDefeatedMonsters([]);
        };

        if (dungeonId) {
            const storedDefeatedMonsters = localStorage.getItem(`defeatedMonsters_${dungeonId}`);
            if (!storedDefeatedMonsters) {
                initializeGame();
            } else {
                setDefeatedMonsters(JSON.parse(storedDefeatedMonsters));
            }
        }
    }, [dungeonId, setPlayerHealth, setCoins, setDefeatedMonsters]);

  if (!chain || chain.length === 0) {
    return <div>Loading dungeon data...</div>;
  }

  return <ChainViewer />;
};

export default DungeonPage;