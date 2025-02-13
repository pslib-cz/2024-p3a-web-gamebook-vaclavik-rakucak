import React, { useState, useEffect } from 'react';
import { Room } from '../../types/ViewModels';

type TrapRoomProps = {
    room: Room;
};

const TrapRoom: React.FC<TrapRoomProps> = ({ room }) => {
    const [images, setImages] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const fetchImages = async () => {
            const newImages: { [key: number]: string } = {};
            for (const item of room.roomItems || []) {
                if (item.imageId) {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/images/${item.imageId}`);
                    const blob = await response.blob();
                    newImages[item.imageId] = URL.createObjectURL(blob);
                }
            }
            setImages(newImages);
        };

        fetchImages();
    }, [room.roomItems]);

    const handleTrapActivate = (itemId: number) => {
        console.log('Trap activated:', itemId);
    };

    return (
        <div >
            <h2>Trap Room {room.id}</h2>
            <p>{room.description}</p>
            {room.roomItems?.map(item => (
                <div key={item.id}>
                    <p>{item.name}: {item.description} (Damage: {item.damage})</p>
                    {images[item.imageId] && <img src={images[item.imageId]} alt={item.name} />}
                    <button onClick={() => handleTrapActivate(item.id)}>Activate Trap</button>
                </div>
            ))}
        </div>
    );
};

export default TrapRoom;