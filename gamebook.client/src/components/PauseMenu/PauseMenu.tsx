import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Buttons/ButtonLarge/ButtonLarge';
import Inventory from '../Inventory/Inventory';
import styles from './PauseMenu.module.css';

interface PauseMenuProps {
  currentPage: string;
  onClose: () => void;
  setChain: (chain: any) => void;
  setCurrentChainIndex: (index: number) => void;
  changeCoins: (amount: number) => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({ currentPage, onClose, setChain, setCurrentChainIndex, changeCoins }) => {
  const [showTutorial, setShowTutorial] = useState(false);
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const navigate = useNavigate();

  const handleQuestClick = () => {
    // Implementace pro zobrazení aktivního questu
  };

  const handleInventoryClick = () => {
    setShowInventory(true);
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

  const handleCloseInventory = () => {
    setShowInventory(false);
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

      {showInventory && (
        <div className={styles.inventoryModal}>
          <Inventory />
          <Button onClick={handleCloseInventory}>Close Inventory</Button>
        </div>
      )}
    </div>
  );
};

export default PauseMenu;