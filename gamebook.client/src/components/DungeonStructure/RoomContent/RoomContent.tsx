import React from 'react';
import { Room } from '../../../types/RoomDto';
import styles from './RoomContent.module.css';
import Button from '../../Buttons/ButtonLarge/ButtonLarge';
import { useGameContext } from '../../../contexts/GameContext';

type RoomContentProps = {
  room: Room;
  onFightStart: () => void;
};

const RoomContent: React.FC<RoomContentProps> = ({ room, onFightStart }) => {
  return (
    <div className={styles.roomContent}>
      <h2>Místnost {room.id}</h2>
      <p>{room.description}</p>
      {room.type === 'monster' && (
        <Button onClick={onFightStart}>Start Fight</Button>
      )}
    </div>
  );
};

export default RoomContent;