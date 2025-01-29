import React, { useState } from 'react';
import Inventory from './Inventory';
import styles from './InventoryButton.module.css';
import Button from '../Buttons/ButtonLarge/ButtonLarge';

const InventoryButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleInventory = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
        <div className={styles.inventoryButton}>
            <Button onClick={toggleInventory}>
                <img src="/public/backpack-1.png" alt="Open Inventory" />
            </Button>
        </div>
      {isOpen && <Inventory />}
    </div>
  );
};

export default InventoryButton;