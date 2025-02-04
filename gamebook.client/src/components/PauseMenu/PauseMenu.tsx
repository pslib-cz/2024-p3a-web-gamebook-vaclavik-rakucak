import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Buttons/ButtonLarge/ButtonLarge';
import styles from './PauseMenu.module.css';
import { ChainElement } from '../../types/ViewModels';
import InventoryButton from '../Inventory/InventoryButton';

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
  const navigate = useNavigate();

  const handleQuestClick = () => {
    // Implementace pro zobrazení aktivního questu
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
    </div>
  );
};

export default PauseMenu;