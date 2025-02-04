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

const ChainViewer: React.FC = () => {
    const {
        defeatedMonsters,
        setDefeatedMonsters,
        currentChainIndex,
        setCurrentChainIndex,
        chain,
        changeCoins,
        setChain
    } = useGameContext();
    const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
    const [isFighting, setIsFighting] = useState<boolean>(false);
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

    const handleFightEnd = (monsterId?: number) => {
        setIsFighting(false);
        if (monsterId) {
            setDefeatedMonsters([...defeatedMonsters, monsterId]);
            if (currentItem && currentItem.type === 'room') {
                currentItem.data.active = false; // Set active to false after fight
            }
        }
    };

    const handleGoBackToMap = () => {
        navigate('/map');
        changeCoins(10);
        clearSessionStorage();   
    };

    const handleStartFight = () => {
        setIsFighting(true);
    };

    const togglePauseMenu = () => {
        setIsPauseMenuOpen(!isPauseMenuOpen);
    };

    if (!chain || chain.length === 0) {
        return <div className={styles.ViewContainer}>No chain data available.</div>;
    }

    if (!currentItem) {
        return <div className={styles.ViewContainer}>Aktuální pozice nenalezena</div>;
    }

    const isLastRoom = currentChainIndex === chain.length - 1;
    const isActive = currentItem.type === 'room' && currentItem.data.active;

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
            {currentItem && currentItem.type === 'room' && !isFighting && (
                <RoomContent
                    room={currentItem.data}
                    onFightStart={handleStartFight}
                />
            )}
            {/* Zobrazení FightComponent, pokud je aktivní boj */}
            {currentItem && currentItem.type === 'room' && isFighting && (
                <FightComponent onFightEnd={handleFightEnd} />
            )}

            {currentItem && currentItem.type === 'hall' && (
                <HallContent hall={currentItem.data} />
            )}
            {currentItem && currentItem.type === 'fork' && (
                <ForkContent fork={currentItem.data} />
            )}

            <NavigationButtons
                currentChainIndex={currentChainIndex}
                chainLength={chain.length}
                isRoomDeadEnd={currentItem?.type === 'room' ? currentItem.data.isDeadEnd : false}
                isFork={currentItem?.type === 'fork'}
                onPrevious={handlePrevious}
                onNext={handleNext}
                isFighting={isFighting}
                isActive={isActive} // Pass isActive to NavigationButtons
            />
            {isLastRoom && (
                <div className={styles.goBackButton}>
                    <Button onClick={handleGoBackToMap}>Exit Dungeon</Button>
                </div>
            )}
        </div>
    );
};

export default ChainViewer;