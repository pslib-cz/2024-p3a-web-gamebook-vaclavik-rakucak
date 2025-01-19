import React from 'react';
import { HallDto } from '../../../types/RoomDto';
import styles from './RoomViewer.module.css';

interface HallContentProps {
  hall: HallDto;
}

const HallContent: React.FC<HallContentProps> = ({ hall }) => {
  return (
    <div className={styles.hallContent}>
      <h2>Chodba {hall.id}</h2>
    </div>
  );
};

export default HallContent;