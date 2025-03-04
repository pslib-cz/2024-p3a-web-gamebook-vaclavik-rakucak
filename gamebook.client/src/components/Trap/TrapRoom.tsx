import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Room, RoomItem } from '../../types/ViewModels';
import { useGameContext } from '../../contexts/GameContext';
import Modal from '../Modal/Modal';
import styles from './TrapRoom.module.css';
import Button from '../Buttons/ButtonLarge/ButtonLarge';
import { fetchImage } from '../../api/imagesApi';

type TrapRoomProps = {
    room: Room;
    onRoomUpdate: (updatedRoom: Room) => void;
};

const TrapRoom: React.FC<TrapRoomProps> = ({ room, onRoomUpdate }) => {
    const [image, setImage] = useState<string | null>(null);
    const [trapModalMessage, setTrapModalMessage] = useState<string | null>(null);
    const [disarmModalMessage, setDisarmModalMessage] = useState<string | null>(null);
    const [roomItem, setRoomItem] = useState<RoomItem | null>(null);
    const { changeHealth } = useGameContext();

    useEffect(() => {
        const fetchRoomItem = async () => {
            if (room.roomItemId) {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/roomitems/${room.roomItemId}`);
                const data: RoomItem = response.data;
                setRoomItem(data);
            }
        };

        fetchRoomItem();
    }, [room.roomItemId]);

    useEffect(() => {
        const fetchImageForRoomItem = async () => {
            if (roomItem?.imageId) {
                try {
                    const imageUrl = await fetchImage(roomItem.imageId);
                    setImage(imageUrl);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
        };

        fetchImageForRoomItem();
    }, [roomItem]);

    const handleTrapActivate = () => {
        if (roomItem) {
            const damage = 10; // Fixed damage for passing through the trap
            setTrapModalMessage(`Utrpěl jsi ${damage} poškození!`);
            changeHealth(-damage);

            // Wait for 3 seconds before closing the modal and updating the room
            setTimeout(() => {
                setTrapModalMessage(null);
                const updatedRoom = { ...room, active: false };
                onRoomUpdate(updatedRoom);
            }, 1000);
        }
    };

    const handleDisarmTrap = () => {
        if (roomItem) {
            const success = Math.random() < 0.5; // 50% chance of success
            const damage = success ? 0 : 20; // 0 damage if successful, 20 damage if failed
            setDisarmModalMessage(success ? 'Úspěšně jsi zneškodnil past!' : `Zneškodnění pasti selhalo! Utrpěl jsi ${damage} poškození!`);
            changeHealth(-damage);

            // Wait for 3 seconds before closing the modal and updating the room
            setTimeout(() => {
                setDisarmModalMessage(null);
                const updatedRoom = { ...room, active: false };
                onRoomUpdate(updatedRoom);
            }, 1000);
        }
    };

    return (
        <div className={styles.trapRoom}>
            <h2>Trap Room {room.id}</h2>
            <p>{room.description}</p>
            {roomItem && (
                <div className={styles.trapInfo}>
                    <p>{roomItem.name}: {roomItem.description} (Damage: {roomItem.damage})</p>
                    <div className={styles.imageContainer}>
                        {image && <img src={image} alt={roomItem.name} className={styles.image} />}
                    </div>
                    <div className={styles.buttons}>
                        <Button onClick={handleTrapActivate}>Přejít přes past</Button>
                        <Button onClick={handleDisarmTrap}>Zneškodnit past</Button>
                    </div>
                </div>
            )}
            {trapModalMessage && <Modal onClose={() => setTrapModalMessage(null)}>{trapModalMessage}</Modal>}
            {disarmModalMessage && <Modal onClose={() => setDisarmModalMessage(null)}>{disarmModalMessage}</Modal>}
        </div>
    );
};

export default TrapRoom;