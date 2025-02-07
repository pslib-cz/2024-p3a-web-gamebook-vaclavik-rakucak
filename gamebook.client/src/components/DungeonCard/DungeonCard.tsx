import React from 'react';
import styles from './DungeonCard.module.css';
import Button from '../Buttons/ButtonSmall/ButtonSmall';
import { Dungeon } from '../../types/ViewModels';

type DungeonCardProps = {
  dungeon: Dungeon | null;
  onClose: () => void;
  onEnter: (id: number) => void;
  playerDamage: number;
};

const DungeonCard: React.FC<DungeonCardProps> = ({ dungeon, onClose, onEnter, playerDamage }) => {
  if (!dungeon) return null;

  const canEnter = playerDamage >= dungeon.dmgCondition;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>{dungeon.name}</h2>
        <p>{dungeon.description}</p>
        <p>Reward: {dungeon.rewardMoney} gold</p>
        <p>Required damage: {dungeon.dmgCondition}</p>
        {canEnter ? (
          <Button onClick={() => onEnter(dungeon.id)}>Enter</Button>
        ) : (
          <Button onClick={() => onEnter(dungeon.id)} disabled>Locked</Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default DungeonCard;