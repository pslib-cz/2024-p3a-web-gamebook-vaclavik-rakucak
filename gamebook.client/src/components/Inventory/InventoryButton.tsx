import React, { useState } from 'react';
import Inventory from './Inventory';
import styles from './InventoryButton.module.css';

type InventoryButtonProps = {
  isInMenu?: boolean;
};

const InventoryButton: React.FC<InventoryButtonProps> = ({ isInMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleInventory = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div>
        <button onClick={toggleInventory} className={isInMenu ? styles.inventoryButtonMenu : styles.inventoryButton}>
          {isInMenu ? 'Open Inventory' : <img src="/public/backpack-1.png" alt="Open Inventory" />}
        </button>
      </div>
      {isOpen && <Inventory />}
    </div>
  );
};

export default InventoryButton;