import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Buttons/ButtonLarge/ButtonLarge';
import styles from './PauseMenu.module.css';
import { ChainElement } from '../../types/ViewModels';
import InventoryButton from '../Inventory/InventoryButton';
import { useGameContext } from '../../contexts/GameContext';

interface PauseMenuProps {
  onClose: () => void;
  currentPage: string;
  setChain?: (chain: ChainElement[] | null) => void;
  setCurrentChainIndex?: (index: number) => void;
  changeCoins?: (amount: number) => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ currentPage, onClose, setChain, setCurrentChainIndex, changeCoins }) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [showActiveQuest, setShowActiveQuest] = useState(false); // Přidáme tento stav
  const navigate = useNavigate();
  const { currentQuests } = useGameContext();

  const handleQuestClick = () => {
    setShowActiveQuest(!showActiveQuest);
  };

  const handleTutorialClick = () => {
    setShowTutorial(!showTutorial);
  };

  const handleExitDungeonClick = () => {
    setShowConfirmExit(true);
  };

  const handleConfirmExit = () => {
    if (setChain && setCurrentChainIndex && changeCoins) {
      setChain(null);
      setCurrentChainIndex(0);
      changeCoins(0);
      navigate('/map');
      onClose();
    } else {
      console.error('Required functions are not provided');
    }
  };

  const handleCancelExit = () => {
    setShowConfirmExit(false);
  };

  const handleGoToMap = () => {
    navigate('/map');
    onClose();
  };

  return (
    <div className={styles.pauseMenu}>
      <Button onClick={handleQuestClick}>Active Quest</Button>
      <InventoryButton isInMenu />
      <Button onClick={handleTutorialClick}>Tutorial</Button>
      {currentPage === 'dungeon' && (
        <Button onClick={handleExitDungeonClick}>Exit Dungeon</Button>
      )}
      {currentPage !== 'dungeon' && currentPage !== 'Map' && (
        <Button onClick={handleGoToMap}>Open Map</Button>
      )}
      {showConfirmExit && (
        <div className={styles.confirmExit}>
          <p>Are you sure you want to exit the dungeon?</p>
          <Button onClick={handleConfirmExit}>Yes</Button>
          <Button onClick={handleCancelExit}>No</Button>
        </div>
      )}
      {showTutorial && (
        <div className={styles.tutorial}>
          <p>Tutorial content goes here...</p>
          <Button onClick={handleTutorialClick}>Close Tutorial</Button>
        </div>
      )}
      {showActiveQuest && (
        <div className={styles.activeQuest}>
          {currentQuests.length > 0 ? (
            <div>
              <h3>{currentQuests[0].name}</h3>
              <p>{currentQuests[0].description}</p>
              <p>Progress: {currentQuests[0].progress}/{currentQuests[0].conditionValue}</p>
            </div>
          ) : (
            <p>No active quests</p>
          )}
          <Button onClick={handleQuestClick}>Close Active Quest</Button>
        </div>
      )}
    </div>
  );
};

export default PauseMenu;