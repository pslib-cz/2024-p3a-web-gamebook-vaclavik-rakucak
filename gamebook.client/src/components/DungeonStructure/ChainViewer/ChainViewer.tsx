import React, { useEffect, useState } from 'react';
import { useGameContext } from '../../../contexts/GameContext';
import styles from './ChainViewer.module.css';
import RoomContent from '../RoomContent/RoomContent';
import HallContent from '../HallContent/HallContent';
import ForkContent from '../ForkContent/ForkContent';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import { useNavigate } from 'react-router-dom';
import Button from '../../Buttons/ButtonLarge/ButtonLarge';
import FightComponent from '../../FightComponent/FightComponent';
import PauseMenu from '../../PauseMenu/PauseMenu';
import Burgir from '../../Burgir/Burgir';
import { Dungeon } from '../../../types/ViewModels';
import KeyRoom from '../../Key/KeyRoom';
import ChestRoom from '../../Chest/ChestRoom';
import TrapRoom from '../../Trap/TrapRoom';
import Modal from '../../Modal/Modal';
import QuestRoom from '../../Quest/QuestRoom';

const ChainViewer: React.FC = () => {
    const {
        defeatedMonsters,
        setDefeatedMonsters,
        currentChainIndex,
        setCurrentChainIndex,
        chain,
        changeCoins,
        setChain,
        checkAndUpdateQuests,
        currentQuests,
    } = useGameContext();
    const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
    const [isFighting, setIsFighting] = useState<boolean>(false);
    const [isKeyRoomActive, setIsKeyRoomActive] = useState<boolean>(false);
    const [isChestRoomActive, setIsChestRoomActive] = useState<boolean>(false);
    const [isTrapRoomActive, setIsTrapRoomActive] = useState<boolean>(false);
    const [isQuestRoomActive, setIsQuestRoomActive] = useState<boolean>(false);
    const [dungeons, setDungeons] = useState<Dungeon[]>([]);
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const currentItem = chain ? chain[currentChainIndex] : null;
    const navigate = useNavigate();
    const [isPauseMenuOpen, setIsPauseMenuOpen] = useState<boolean>(false);
    const clearSessionStorage = () => {
        sessionStorage.removeItem('shopEquipment');
    };

    const baseApiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const currentItem = chain ? chain[currentChainIndex] : null;
        
        if (
            currentItem &&
            (currentItem.type === 'hall' || currentItem.type === 'room') &&
            currentItem.data.imageId
        ) {
            setBackgroundImageUrl(`${baseApiUrl}/images/${currentItem.data.imageId}`);
        } else {
            setBackgroundImageUrl('');
        }
    }, [chain, currentChainIndex]);

    useEffect(() => {
        const fetchDungeons = async () => {
            try {
                const response = await fetch(`${baseApiUrl}/Dungeons`);
                if (!response.ok) {
                    throw new Error('Failed to fetch dungeons');
                }
                const data: Dungeon[] = await response.json();
                setDungeons(data);
            } catch (error) {
                console.error('Error fetching dungeons:', error);
            }
        };

        fetchDungeons();
    }, []);

    useEffect(() => {
        if (modalMessage) {
            const timer = setTimeout(() => {
                setModalMessage(null);
            }, 1000); // Zavře modální okno po 3 vteřinách

            return () => clearTimeout(timer);
        }
    }, [modalMessage]);

    const handleNext = () => {
        if (!chain) return;

        if (currentChainIndex < chain.length - 1) {
            const nextIndex = currentChainIndex + 1;
            setCurrentChainIndex(nextIndex);
            setIsFighting(false);
        }
    };

    const handlePrevious = () => {
        if (currentChainIndex > 0) {
            const prevIndex = currentChainIndex - 1;
            setCurrentChainIndex(prevIndex);
            setIsFighting(false);
        }
    };

    const handleFightEnd = (monsterId?: number, playerDied?: boolean, monsterName?: string) => {
        setIsFighting(false);
        if (playerDied) {
            setChain(null);
            navigate('/map');
            clearSessionStorage();  
            return;
        }
        if (monsterId && monsterName) {
            setDefeatedMonsters([...defeatedMonsters, monsterId]);
            setModalMessage(`${monsterName} was defeated!`);
            if (currentItem && currentItem.type === 'room') {
                currentItem.data.type = 'empty';
                currentItem.data.active = false; // Update room state to inactive
                checkAndUpdateQuests(monsterId);
            }
        }
    };

    const handleGoBackToMap = () => {
        if (chain && chain.length > 0) {
            const dungeonId = chain[0].data.dungeonId;
            const dungeon = dungeons.find(d => d.id === dungeonId);
            if (dungeon) {
                changeCoins(dungeon.rewardMoney);
                checkAndUpdateQuests(dungeonId);
            }
        }
        setChain(null);
        navigate('/map');
        clearSessionStorage();   
    };

    const handleStartFight = () => {
        setIsFighting(true);
    };

    const handleSearch = () => {
        if (currentItem && currentItem.type === 'room') {
            if (currentItem.data.type === 'keyRoom') {
                setIsKeyRoomActive(true);
            }
            if (currentItem.data.type === 'chestRoom') {
                setIsChestRoomActive(true);
            }
            if (currentItem.data.type === 'trapRoom') {
                setIsTrapRoomActive(true);
            }
            if (currentItem.data.type === 'questRoom') {
                setIsQuestRoomActive(true);
            }
        }
        console.log(currentQuests);
    };

    const handleRoomUpdate = (updatedRoom: any) => {
        if (currentItem && currentItem.type === 'room') {
            currentItem.data = updatedRoom;
            if (updatedRoom.type === 'keyRoom') {
                setIsKeyRoomActive(false);
            }
            if (updatedRoom.type === 'chestRoom') {
                setIsChestRoomActive(false);
            }
            if (updatedRoom.type === 'trapRoom') {
                setIsTrapRoomActive(false);
            }
            if (updatedRoom.type === 'questRoom') {
                setIsQuestRoomActive(false);
            }
        }
    };

    const handleCloseKeyRoom = () => {
        setIsKeyRoomActive(false);
    };
    const handleCloseChestRoom = () => {
        setIsChestRoomActive(false);
    };

    const togglePauseMenu = () => {
        setIsPauseMenuOpen(!isPauseMenuOpen);
    };
    const handleCloseQuestRoom = () => {
        setIsQuestRoomActive(false);
    };

    if (!chain || chain.length === 0) {
        return <div className={styles.ViewContainer}>No chain data available.</div>;
    }

    if (!currentItem) {
        return <div className={styles.ViewContainer}>Aktuální pozice nenalezena</div>;
    }

    const isLastRoom = currentChainIndex === chain.length - 1;
    const isActive = currentItem.type === 'room' && currentItem.data.type === 'monsterRoom' ? true : false;
    const isRoomActive = isFighting || isKeyRoomActive || isChestRoomActive || isTrapRoomActive;

    return (
        <div className={styles.ViewContainer}>
            <div className={styles.Burgir}>
                <Burgir onClick={togglePauseMenu} isOpen={isPauseMenuOpen}/>
            </div>
            {isPauseMenuOpen && (
                <PauseMenu
                    onClose={togglePauseMenu}
                    currentPage='dungeon'
                    setChain={setChain}
                    setCurrentChainIndex={setCurrentChainIndex}
                    changeCoins={changeCoins}
                />
            )}
            {currentItem &&
                (currentItem.type === 'hall' || currentItem.type === 'room') &&
                backgroundImageUrl && (
                    <div
                        className={styles.hallBackground}
                        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                    />
            )}

            {/* Rozlišení typu currentItem a předání správných dat komponentám */}
            {currentItem && currentItem.type === 'room' 
                && !isFighting 
                && !isKeyRoomActive 
                && !isChestRoomActive
                && !isTrapRoomActive 
                && (
                    <RoomContent
                        room={currentItem.data}
                        onFightStart={handleStartFight}
                        onSearch={handleSearch}
                    />
            )}
            {/* Zobrazení ruzných typu room */}
            {currentItem && currentItem.type === 'room' && isFighting && (
                <FightComponent onFightEnd={handleFightEnd} />
            )}

            {currentItem && currentItem.type === 'room' && isKeyRoomActive && (
                <KeyRoom room={currentItem.data} onRoomUpdate={handleRoomUpdate} onClose={handleCloseKeyRoom} />
            )}

            {currentItem && currentItem.type === 'room' && isChestRoomActive && (
                <ChestRoom room={currentItem.data} onRoomUpdate={handleRoomUpdate} onClose={handleCloseChestRoom}/>
            )}

            {currentItem && currentItem.type === 'room' && isTrapRoomActive && (
                <TrapRoom room={currentItem.data} onRoomUpdate={handleRoomUpdate}/>
            )}

            {currentItem && currentItem.type === 'hall' && (
                <HallContent hall={currentItem.data} />
            )}
            {currentItem && currentItem.type === 'fork' && (
                <ForkContent fork={currentItem.data} />
            )}
            {currentItem && currentItem.type === 'room' && isQuestRoomActive && (
                <QuestRoom room={currentItem.data} quest={currentQuests[0]} onRoomUpdate={handleRoomUpdate} onClose={handleCloseQuestRoom} />
            )}

            <NavigationButtons
                currentChainIndex={currentChainIndex}
                chainLength={chain.length}
                isRoomDeadEnd={currentItem?.type === 'room' ? currentItem.data.isDeadEnd : false}
                isFork={currentItem?.type === 'fork'}
                onPrevious={handlePrevious}
                onNext={handleNext}
                isFighting={isFighting}
                isActive={isActive} 
                isRoomActive={isRoomActive}
            />
            {isLastRoom && (
                <div className={styles.goBackButton}>
                    <Button onClick={handleGoBackToMap}>Exit Dungeon</Button>
                </div>
            )}
            {modalMessage && <Modal onClose={() => setModalMessage(null)}>{modalMessage}</Modal>}
        </div>
    );
};

export default ChainViewer;