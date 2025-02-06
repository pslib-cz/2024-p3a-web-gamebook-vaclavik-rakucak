import React from 'react';
import { Hall } from '../../../types/ViewModels';
import styles from '../ChainViewer/ChainViewer.module.css';

interface HallContentProps {
  hall: Hall;
}

const HallContent: React.FC<HallContentProps> = ({ hall }) => {
  return (
    <div className={styles.hallContent}>
      <h2>Chodba {hall.id}</h2>
    </div>
  );
};

export default HallContent;