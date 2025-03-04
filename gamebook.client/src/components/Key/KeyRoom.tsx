import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Room, Key } from '../../types/ViewModels';
import styles from './KeyRoom.module.css';
import { useGameContext } from '../../contexts/GameContext';
import Button from '../Buttons/ButtonLarge/ButtonLarge';
import { fetchImage } from '../../api/imagesApi';

type KeyRoomProps = {
    room: Room;
    onRoomUpdate: (updatedRoom: Room) => void;
    onClose: () => void;
};

const KeyRoom: React.FC<KeyRoomProps> = ({ room, onRoomUpdate, onClose }) => {
    const [key, setKey] = useState<Key | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const { items, setItems } = useGameContext();

    useEffect(() => {
        const fetchKey = async () => {
            if (room.keyId) {
                const keyUrl = `${import.meta.env.VITE_API_URL}/keys/${room.keyId}`;
                console.log('Fetching key from URL:', keyUrl);
                try {
                    const response = await axios.get(keyUrl);
                    const keyData: Key = response.data;
                    console.log('Key fetched successfully:', keyData);
                    setKey(keyData);
                } catch (error) {
                    console.error('Error fetching key:', error);
                }
            }
        };

        fetchKey();
    }, [room.keyId]);

    useEffect(() => {
        const fetchImageForKey = async () => {
            if (key?.imageId) {
                try {
                    const imageUrl = await fetchImage(key.imageId);
                    console.log('Image fetched successfully:', imageUrl);
                    setImage(imageUrl);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
        };

        fetchImageForKey();
    }, [key]);

    const handleKeyCollect = () => {
        if (key) {
            const existingKeyIndex = items.findIndex(item => item.id === key.id && item.type === 'Key');
            let updatedItems = [...items];

            if (existingKeyIndex !== -1) {
                updatedItems[existingKeyIndex].quantity = (updatedItems[existingKeyIndex].quantity || 1) + 1;
            } else {
                const newKey = { ...key, quantity: 1, dmg: 0, rarity: 'common', price: 0, type: 'Key' as const };
                updatedItems.push(newKey);
            }

            setItems(updatedItems);
            sessionStorage.setItem('backpackItems', JSON.stringify(updatedItems));
            console.log('Key added to backpack:', key);

            // Update room state to inactive
            const updatedRoom = { ...room, active: false };
            onRoomUpdate(updatedRoom);
        }
    };

    const handleNoKeyCollect = () => {
        onClose();
    };

    return (
        <div className={styles.keyRoom}>
            <h2>Key Room {room.id}</h2>
            <p>{room.description}</p>
            {key && (
                <div className={styles.keyInfo}>
                    <p>Key: {key.name}</p>
                    <div className={styles.imageContainer}>
                        {image && <img src={image} alt={key.name} className={styles.image} />}
                    </div>
                    <div className={styles.buttons}>
                        <Button onClick={handleKeyCollect}>Collect Key</Button>
                        <Button onClick={handleNoKeyCollect}>Leave it here</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KeyRoom;