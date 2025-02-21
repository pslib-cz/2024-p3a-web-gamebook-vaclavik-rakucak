import React from 'react';
import EquipmentSlot from './EquipmentSlot';
import Backpack from './Backpack';
import styles from './Inventory.module.css';

type InventoryProps = {
  onClose: () => void;
};

const Inventory: React.FC<InventoryProps> = ({ onClose }) => {
  return (
    <div className={styles.inventory}>
      <button className={styles.closeButton} onClick={onClose}>X</button>
      <h2>Equipment</h2>
      <div className={styles.equipmentAndImageContainer}>
        <div className={styles.equipmentContainer}>
          <EquipmentSlot />
        </div>
      </div>
      <h2>Backpack</h2>
      <div className={styles.backpackContainer}>
        <Backpack />
      </div>
    </div>
  );
};

export default Inventory;