import React from 'react';
import styles from './HallContent.module.css';
import { Hall } from '../../../types/ViewModels';


interface HallContentProps {

  hall: Hall;

}



const HallContent: React.FC<HallContentProps> = ({ hall }) => {
  return (
    <div className={styles.hallContent}>
      <p>Hall</p>
    </div>
  );
};

export default HallContent;