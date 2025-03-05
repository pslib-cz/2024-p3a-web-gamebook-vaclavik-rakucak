import React from 'react';
import { Room } from '../../../types/ViewModels';
import styles from './RoomContent.module.css';
import Button from '../../Buttons/ButtonLarge/ButtonLarge';

type RoomContentProps = {
    room: Room;
    onFightStart: () => void;
    onSearch: () => void;
};

const RoomContent: React.FC<RoomContentProps> = ({ room, onFightStart, onSearch }) => {
    const isActive = room.active != null ? room.active : true;

    return (
        <div className={styles.roomContent}>
            <p>{room.description}</p>
            {isActive && (
                <div className={styles.actionButtons}>
                    {room.type === 'monsterRoom' && (
                        <Button onClick={onFightStart}>Start Fight</Button>
                    )}
                    {room.type === 'bossRoom' && (
                        <Button onClick={onFightStart}>Start Boss Fight</Button>
                    )}
                    {(room.type === 'keyRoom' || room.type === 'chestRoom' || room.type === 'trapRoom' || room.type === 'questRoom') && (
                        <Button onClick={onSearch}>Search</Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default RoomContent;