import React, { useState, useEffect } from 'react';
import { Room, RoomItem, Item } from '../../types/ViewModels';
import { useGameContext } from '../../contexts/GameContext';
import Button from '../Buttons/ButtonLarge/ButtonLarge';
import styles from './ChestRoom.module.css';
import Modal from '../Modal/Modal';

type ChestRoomProps = {
    room: Room;
    onRoomUpdate: (updatedRoom: Room) => void;
    onClose: () => void;
};

const ChestRoom: React.FC<ChestRoomProps> = ({ room, onRoomUpdate, onClose }) => {
    const [image, setImage] = useState<string | null>(null);
    const [roomItem, setRoomItem] = useState<RoomItem | null>(null);
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [keyAlert, setKeyAlert] = useState<boolean>(false);
    const { items, setItems } = useGameContext();

    useEffect(() => {
        const fetchRoomItem = async () => {
            if (room.roomItemId) {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/roomitems/${room.roomItemId}`);
                const data: RoomItem = await response.json();
                setRoomItem(data);
            }
        };

        fetchRoomItem();
    }, [room.roomItemId]);

    useEffect(() => {
        const fetchImage = async () => {
            if (roomItem && roomItem.imageId) {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/images/${roomItem.imageId}`);
                const blob = await response.blob();
                setImage(URL.createObjectURL(blob));
            }
        };

        fetchImage();
    }, [roomItem]);

    const handleChestOpen = async () => {
        const keyIndex = items.findIndex(item => item.type === 'Key' && item.dungeonId === room.dungeonId);
        if (keyIndex !== -1) {
            const key = items[keyIndex];
            const updatedItems = [...items];

            // Odeberte klíč z batohu
            if (key.quantity && key.quantity > 1) {
                key.quantity -= 1;
            } else {
                updatedItems.splice(keyIndex, 1);
            }

            // Fetch item z truhly
            if (roomItem) {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/Equipments/${roomItem.equipmentId}`);
                const item: Item = await response.json();
                const existingItemIndex = updatedItems.findIndex(i => i.id === item.id);

                if (existingItemIndex !== -1) {
                    updatedItems[existingItemIndex].quantity = (updatedItems[existingItemIndex].quantity || 1) + 1;
                } else {
                    item.quantity = 1;
                    updatedItems.push(item);
                }

                setItems(updatedItems);
                sessionStorage.setItem('backpackItems', JSON.stringify(updatedItems))
                setModalMessage(`You found ${item.name} in the chest!`);
                console.log('Item added to backpack:', item);
            }

            setTimeout(() => {
                // Update room state to inactive
                const updatedRoom = { ...room, active: false };
                onRoomUpdate(updatedRoom);
            }, 1000);
        } else {
            setKeyAlert(true);
        }
    };

    const handleLeave = () => {
        onClose();
    };

    return (
        <div className={styles.chestRoom}>
            <h2>Chest Room {room.id}</h2>
            <p>{room.description}</p>
            <div className={styles.imageContainer}>
                {image && <img src={image} alt="Chest" className={styles.image} />}
            </div>
            <div className={styles.buttons}>
                <Button onClick={handleChestOpen}>Unlock Chest</Button>
                <Button onClick={handleLeave}>Leave</Button>
            </div>
            {modalMessage && <Modal onClose={() => setModalMessage(null)}>{modalMessage}</Modal>}
            {keyAlert && <Modal onClose={() => setKeyAlert(false)} children2='(You may come again to this dungeon.)'>You need a key from this dungeon to unlock this treasure.</Modal>}
        </div>
    );
};

export default ChestRoom;