import React from 'react';
import styles from './EnemyHealthBar.module.css';

interface HealthBarProps {
  current: number;
  max: number;
}

const EnemyHealthBar: React.FC<HealthBarProps> = ({ current, max }) => {
  const percentage = max > 0 ? Math.round((current / max) * 100) : 0;

  return (
    <div className={styles.healthBar}>
      <div className={styles.healthBarFill} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default EnemyHealthBar;