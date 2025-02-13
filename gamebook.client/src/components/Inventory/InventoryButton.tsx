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

  const closeInventory = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div>
        <button onClick={toggleInventory} className={isInMenu ? styles.inventoryButtonMenu : styles.inventoryButton}>
          {isInMenu ? 'Open Inventory' : <img src="/backpack-1.png" alt="Open Inventory" />}
        </button>
      </div>
      {isOpen && <Inventory onClose={closeInventory} />}
    </div>
  );
};

export default InventoryButton;