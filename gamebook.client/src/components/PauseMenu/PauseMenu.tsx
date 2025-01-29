import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../../contexts/GameContext';
import styles from './PauseMenu.module.css';
import Button from '../Buttons/ButtonLarge/ButtonLarge';

interface PauseMenuProps {
  onClose: () => void;
  currentPage: string;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ onClose, currentPage }) => {
  const { changeCoins, setChain, setCurrentChainIndex } = useGameContext();
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [showConfirmExit, setShowConfirmExit] = useState<boolean>(false);
  const [isPauseMenuOpen, setIsPauseMenuOpen] = useState<boolean>(false);

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
  };

  const handleCancelExit = () => {
    setShowConfirmExit(false);
  };

  return (
    <div className={styles.pauseMenu}>
      <Button onClick={handleQuestClick}>Active Quest</Button>
      <Button onClick={handleInventoryClick}>Inventory</Button>
      <Button onClick={handleTutorialClick}>Tutorial</Button>

      {/* Zobraz tlačítko "Exit Dungeon" jen na stránce dungeonu */}
      {currentPage === 'dungeon' && (
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