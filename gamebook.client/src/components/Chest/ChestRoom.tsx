import React, { useState, useEffect } from 'react';
import { Room } from '../../types/ViewModels';

type ChestRoomProps = {
    room: Room;
};

const ChestRoom: React.FC<ChestRoomProps> = ({ room }) => {
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            if (room.imageId) {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/images/${room.imageId}`);
                const blob = await response.blob();
                setImage(URL.createObjectURL(blob));
            }
        };

        fetchImage();
    }, [room.imageId]);


    return (
        <div>
            <h2>Chest Room {room.id}</h2>
            <p>{room.description}</p>
            {image && <img src={image} alt="Chest" />}
            <button>Open Chest</button>
        </div>
    );
};

export default ChestRoom;