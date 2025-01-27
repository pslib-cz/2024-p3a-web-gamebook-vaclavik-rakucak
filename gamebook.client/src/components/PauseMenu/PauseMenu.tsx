import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../contexts/GameContext';
import styles from './PauseMenu.module.css';
import Button from '../Buttons/ButtonLarge/ButtonLarge';

interface PauseMenuProps {
  onClose: () => void;
  isInDungeon: boolean;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ onClose, isInDungeon }) => {
  const { changeCoins, setChain, setCurrentChainIndex } = useGameContext();
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [showConfirmExit, setShowConfirmExit] = useState<boolean>(false);

  const handleQuestClick = () => {
    // TODO: Implementovat zobrazení aktivního questu
    console.log('Quest clicked');
    onClose();
  };

  const handleInventoryClick = () => {
    // TODO: Implementovat zobrazení inventáře (zatím jen tlačítko)
    console.log('Inventory clicked');
    onClose();
  };

  const handleTutorialClick = () => {
    setShowTutorial(!showTutorial);
  };

  const handleExitDungeonClick = () => {
      setShowConfirmExit(true);
  };

  const handleConfirmExit = () => {
      setChain(null);
      setCurrentChainIndex(0);
      changeCoins(0);
      navigate('/map');
      onClose();
  }

  const handleCancelExit = () => {
    setShowConfirmExit(false);
  }

  return (
    <div className={styles.pauseMenu}>
      <div className={styles.menuHeader}>
        <Button onClick={onClose}>
          <div className={styles.hamburger}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Button>
        <h2>Pause Menu</h2>
      </div>
      <Button onClick={handleQuestClick}>Active Quest</Button>
      <Button onClick={handleInventoryClick}>Inventory</Button>
      <Button onClick={handleTutorialClick}>Tutorial</Button>

      {isInDungeon && (
        <Button onClick={handleExitDungeonClick}>Exit Dungeon</Button>
      )}

      {showTutorial && (
        <div className={styles.tutorial}>
          <h3>Tutorial</h3>
          <p>
            Tady bude stručný návod na hraní hry.
          </p>
          <Button onClick={handleTutorialClick}>Close</Button>
        </div>
      )}

      {showConfirmExit && (
        <div className={styles.confirmModal}>
            <h3>Opravdu chcete opustit dungeon?</h3>
            <p>Ztratíte všechen postup v dungeonu a nedostanete žádnou odměnu.</p>
            <div className={styles.modalButtons}>
                <Button onClick={handleConfirmExit}>Ano</Button>
                <Button onClick={handleCancelExit}>Ne</Button>
            </div>
        </div>
      )}
    </div>
  );
};

export default PauseMenu;