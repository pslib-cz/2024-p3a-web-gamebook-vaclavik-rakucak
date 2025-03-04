import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGameContext } from '../../contexts/GameContext';
import ChainViewer from '../../components/DungeonStructure/ChainViewer/ChainViewer';
import { ChainElement } from '../../types/ViewModels';
import axios from 'axios';

const DungeonPage: React.FC = () => {
    const { dungeonId, type, index } = useParams<{ dungeonId?: string; type?: string; index?: string }>();
    const { chain, setChain, currentChainIndex, setCurrentChainIndex, setDungeonId, setPlayerHealth, setCoins, setDefeatedMonsters, currentQuests } = useGameContext();
    const navigate = useNavigate();

    const baseApiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!dungeonId) {
                    throw new Error('Dungeon ID is missing.');
                }
                setDungeonId(dungeonId);

                if (!chain || chain.length === 0) {
                    const response = await axios.get(`${baseApiUrl}/DungeonChain/${dungeonId}`);

                    if (response.status !== 200) {
                        throw new Error(`Failed to fetch dungeon data: ${response.statusText}`);
                    }

                    const apiData: ChainElement[] = response.data;
                    const quest = currentQuests.find(q => q.condition === 'killBoss' && q.dungeonId === parseInt(dungeonId!));
                    if (quest && quest.bossRoomId) {
                        const bossRoomResponse = await axios.get(`${baseApiUrl}/Rooms/${quest.bossRoomId}`);
                        if (bossRoomResponse.status !== 200) {
                            throw new Error(`Failed to fetch boss room data: ${bossRoomResponse.statusText}`);
                        }
                        const bossRoomData = bossRoomResponse.data;
                        const bossRoomElement: ChainElement = { type: 'room', data: bossRoomData };
                        apiData.push(bossRoomElement);
                    }
                    apiData.forEach(item => {
                        if (item.type === 'room' && item.data.active === undefined) {
                            item.data.active = true; //nastaveni active property na true pro vsechny rooms
                        }
                    });

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
    }, [dungeonId, setChain, navigate, setDungeonId, currentQuests]);

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

    return <ChainViewer dungeonId={parseInt(dungeonId!)} />;
};

export default DungeonPage;