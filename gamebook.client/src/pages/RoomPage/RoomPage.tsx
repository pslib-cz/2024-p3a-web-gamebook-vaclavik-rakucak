import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameContext } from '../../contexts/GameContext';
import RoomViewer from '../../components/DungeonStructure/RoomViewer/RoomViewer';
import { ChainItemDto, RoomDto, HallDto, ForkDto, ForkData } from '../../types/RoomDto';

const RoomPage: React.FC = () => {
  const { dungeonId, type, index } = useParams<{ dungeonId?: string; type?: string; index?: string }>();
  const { chain, setChain, currentChainIndex, setCurrentChainIndex, setDungeonId } = useGameContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!dungeonId) {
          throw new Error('Dungeon ID is missing.');
        }
        setDungeonId(dungeonId);

        const storageKey = `chain_${dungeonId}`;
        const firstEntry = localStorage.getItem('firstEntry');
        const storedData = localStorage.getItem(storageKey);

        let dataToSet: ChainItemDto[] = [];

        if (storedData && firstEntry !== 'true') {
          // Načteme chain z localStorage, POKUD UŽ existuje A NENÍ to první vstup
          const { chain: storedChain, version } = JSON.parse(storedData);

          if (version === getCurrentChainVersion()) {
            dataToSet = storedChain;
            console.log('Načten chain z localStorage:', storedChain);
          } else {
            console.log('Zastaralá verze chainu v localStorage. Načítám nová data.');
          }
        }

        if (dataToSet.length === 0) {
          // Načteme chain z API, pokud:
          // 1. V localStorage nic není NEBO
          // 2. Je to první vstup (firstEntry === 'true')
          const response = await fetch(`https://localhost:7190/DungeonChain/${dungeonId}`);

          if (!response.ok) {
            throw new Error(`Failed to fetch dungeon data: ${response.statusText}`);
          }

          const apiData: any[] = await response.json();

          dataToSet = apiData.map((item) => {
            if (item.type === 'room') {
              const roomData = item.data as RoomDto;
              return {
                type: item.type,
                data: {
                  id: roomData.id,
                  type: roomData.type,
                  description: roomData.description,
                  dungeonId: roomData.dungeonId,
                  imageId: roomData.imageId,
                  isDeadEnd: roomData.isDeadEnd,
                },
                isDeadEnd: item.isDeadEnd,
              };
            } else if (item.type === 'hall') {
              const hallData = item.data as HallDto;
              return {
                type: item.type,
                data: {
                  id: hallData.id,
                  imageId: hallData.imageId,
                  roomId: hallData.roomId,
                  dungeonId: hallData.dungeonId,
                  room: {
                    id: hallData.room.id,
                    type: hallData.room.type,
                    description: hallData.room.description,
                    dungeonId: hallData.room.dungeonId,
                    imageId: hallData.room.imageId,
                    isDeadEnd: hallData.room.isDeadEnd,
                  },
                },
              };
            } 
            return item;
          });

          localStorage.setItem(storageKey, JSON.stringify({ chain: dataToSet, version: getCurrentChainVersion() }));
          console.log('Uložen nový chain do localStorage:', dataToSet);

          // Po načtení z API vymažeme příznak firstEntry
          localStorage.removeItem('firstEntry');
        }

        setChain(dataToSet);

      } catch (error) {
        console.error('Error fetching or processing dungeon data:', error);
        navigate('/');
      }
    };

    if (dungeonId) {
      fetchData();
    }
  }, [dungeonId, setChain, navigate]);

  useEffect(() => {
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
    if (dungeonId && chain && currentChainIndex >= 0 && currentChainIndex < chain.length) {
        const currentItem = chain[currentChainIndex];
        const newType = currentItem.type;
        const newIndex = currentChainIndex;

        if (type !== newType || index !== newIndex.toString()) {
            navigate(`/Dungeon/${dungeonId}/${newType}/${newIndex}`, { replace: true });
        }
    }
}, [dungeonId, chain, currentChainIndex, navigate, type, index]);

  if (!chain || chain.length === 0) {
    return <div>Loading dungeon data...</div>;
  }

  return <RoomViewer />;
};

const getCurrentChainVersion = () => {
  return 1;
};

export default RoomPage;