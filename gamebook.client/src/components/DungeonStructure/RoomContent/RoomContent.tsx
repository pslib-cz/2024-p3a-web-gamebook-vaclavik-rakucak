import React from 'react';
import { Room } from '../../../types/ViewModels';
import styles from './RoomContent.module.css';
import Button from '../../Buttons/ButtonLarge/ButtonLarge';

type RoomContentProps = {
    room: Room;
    onFightStart: () => void;
};

const RoomContent: React.FC<RoomContentProps> = ({ room, onFightStart }) => {
    const isActive = room.active !== undefined ? room.active : true;

    return (
        <div className={styles.roomContent}>
            <h2>Místnost {room.id}</h2>
            <p>{room.description}</p>
            {room.type === 'monster' && isActive && (
                <Button onClick={onFightStart}>Start Fight</Button>
            )}
        </div>
    );
};

export default RoomContent;