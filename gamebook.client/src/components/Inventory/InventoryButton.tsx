import React, { useState } from 'react';
import Inventory from './Inventory';
import styles from './InventoryButton.module.css';

const InventoryButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleInventory = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
        <div>
            <button onClick={toggleInventory} className={styles.inventoryButton}>
                <img src="/public/backpack-1.png" alt="Open Inventory" />
            </button>
        </div>
      {isOpen && <Inventory />}
    </div>
  );
};

export default InventoryButton;