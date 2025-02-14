import React, { useState, useEffect } from 'react';
import { Room, Key } from '../../types/ViewModels';
import styles from './KeyRoom.module.css';
import { useGameContext } from '../../contexts/GameContext';

type KeyRoomProps = {
    room: Room;
};

const KeyRoom: React.FC<KeyRoomProps> = ({ room }) => {
    const [key, setKey] = useState<Key | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const { items, setItems } = useGameContext();

    useEffect(() => {
        const fetchKey = async () => {
            if (room.keyId) {
                const keyUrl = `${import.meta.env.VITE_API_URL}/keys/${room.keyId}`;
                console.log('Fetching key from URL:', keyUrl);
                try {
                    const response = await fetch(keyUrl);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch key: ${response.statusText}`);
                    }
                    const keyData: Key = await response.json();
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
        const fetchImage = async () => {
            if (key?.imageId) {
                const imageUrl = `${import.meta.env.VITE_API_URL}/images/${key.imageId}`;
                console.log('Fetching image from URL:', imageUrl);
                try {
                    const response = await fetch(imageUrl);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image: ${response.statusText}`);
                    }
                    const blob = await response.blob();
                    const imageObjectUrl = URL.createObjectURL(blob);
                    console.log('Image fetched successfully:', imageObjectUrl);
                    setImage(imageObjectUrl);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
        };

        fetchImage();
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
        }
    };

    return (
        <div className={styles.keyRoom}>
            <h2>Key Room {room.id}</h2>
            <p>{room.description}</p>
            {key && (
                <div className={styles.keyInfo}>
                    <p>Key: {key.name}</p>
                    <div className={styles.imageContainer}>
                        {image && <img src={image} alt={key.name} className={styles.image}/>}
                    </div>
                    <button onClick={handleKeyCollect}>Collect Key</button>
                </div>
            )}
        </div>
    );
};

export default KeyRoom;