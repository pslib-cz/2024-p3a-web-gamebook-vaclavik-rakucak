import React from 'react';
import styles from './DeathCard.module.css';
import Button from '../Buttons/ButtonLarge/ButtonLarge';

type DeathCardProps = {
  onRespawn: () => void;
}

const DeathCard: React.FC<DeathCardProps> = ({ onRespawn }) => {
  return (
    <div className={styles.deathCard}>
      <h2>You have died!</h2>
      <p>You will be respawned in the town with 50 health points.</p>
      <Button onClick={onRespawn}>Respawn</Button>
    </div>
  );
};

export default DeathCard;