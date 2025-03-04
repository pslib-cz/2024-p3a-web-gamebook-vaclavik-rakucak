import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Room, RoomItem, Quest } from '../../types/ViewModels';
import Button from '../Buttons/ButtonLarge/ButtonLarge';
import styles from './QuestRoom.module.css';
import Modal from '../Modal/Modal';
import { useGameContext } from '../../contexts/GameContext';
import { fetchImage } from '../../api/imagesApi';

type QuestRoomProps = {
    room: Room;
    quest: Quest;
    onRoomUpdate: (updatedRoom: Room) => void;
    onClose: () => void;
};

const QuestRoom: React.FC<QuestRoomProps> = ({ room, quest, onRoomUpdate, onClose }) => {
    const [roomItem, setRoomItem] = useState<RoomItem | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const { checkAndUpdateQuests } = useGameContext();

    useEffect(() => {
        const fetchRoomItem = async () => {
            if (room.roomItemId) {
                const roomItemUrl = `${import.meta.env.VITE_API_URL}/roomitems/${room.roomItemId}`;
                console.log('Fetching room item from URL:', roomItemUrl);
                try {
                    const response = await axios.get(roomItemUrl);
                    const roomItemData: RoomItem = response.data;
                    console.log('Room item fetched successfully:', roomItemData);
                    setRoomItem(roomItemData);
                } catch (error) {
                    console.error('Error fetching room item:', error);
                }
            }
        };

        fetchRoomItem();
    }, [room.roomItemId]);

    useEffect(() => {
        const fetchImageForRoomItem = async () => {
            if (roomItem?.imageId) {
                try {
                    const imageUrl = await fetchImage(roomItem.imageId);
                    console.log('Image fetched successfully:', imageUrl);
                    setImage(imageUrl);
                } catch (error) {
                    console.error('Error fetching image:', error);
                }
            }
        };

        fetchImageForRoomItem();
    }, [roomItem]);

    const handleCollect = () => {
        if (roomItem?.id !== undefined) {
            checkAndUpdateQuests(roomItem.id);
            setModalMessage(`You collected ${roomItem.name}. (added to quest progress)`);
            setTimeout(() => {
                const updatedRoom = { ...room, active: false };
                onRoomUpdate(updatedRoom);
            }, 1000);
        }
    };

    const handleLeave = () => {
        console.log(quest.roomItemId);
        onClose();
    };

    return (
        <div className={styles.questRoom}>
            <h2>Quest Room {room.id}</h2>
            <p>{room.description}</p>
            {roomItem && (
                <div className={styles.roomItem}>
                    <h3>{roomItem.name}</h3>
                    <p>{roomItem.description}</p>
                </div>
            )}
            <div className={styles.imageContainer}>
                {image && <img src={image} alt="roomItem" className={styles.image} />}
            </div>
            <div className={styles.buttons}>
                <Button onClick={handleLeave}>Leave</Button>
                {roomItem && quest.roomItemId === roomItem.id && (
                    <Button onClick={handleCollect}>Collect</Button>
                )}
            </div>
            {modalMessage && <Modal onClose={() => setModalMessage(null)}>{modalMessage}</Modal>}
        </div>
    );
};

export default QuestRoom;