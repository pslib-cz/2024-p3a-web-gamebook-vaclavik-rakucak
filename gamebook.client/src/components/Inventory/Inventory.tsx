import React from 'react';
import EquipmentSlot from './EquipmentSlot';
import Backpack from './Backpack';
import styles from './Inventory.module.css';

const Inventory: React.FC = () => {
  return (
    <div className={styles.inventory}>
      <div className={styles.equipmentContainer}>
        <EquipmentSlot />
      </div>
      <div className={styles.backpackContainer}>
        <Backpack />
      </div>
    </div>
  );
};

export default Inventory;