import React, { useEffect, useState } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import {RoomDto, HallDto, ForkDto } from '../../types/RoomDto';
import styles from './RoomViewer.module.css';
import Button from '../Buttons/Button/Button.tsx';

const RoomViewer: React.FC = () => {
  const { chain, currentChainIndex, setCurrentChainIndex } = useGameContext();

  const handleNext = () => {
    if (chain && currentChainIndex < chain.length - 1) {
      setCurrentChainIndex(currentChainIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentChainIndex > 0) {
      setCurrentChainIndex(currentChainIndex - 1);
    }
  };

  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');

  useEffect(() => {
    const currentItem = chain ? chain[currentChainIndex] : null;
    if (currentItem && currentItem.type === 'hall' || currentItem?.type === 'room' && currentItem.data.imageId) {
      setBackgroundImageUrl(`https://localhost:7190/api/images/${currentItem.data.imageId}`);
    } else {
      setBackgroundImageUrl('');
    }
  }, [chain, currentChainIndex]);

  const renderRoomContent = (room: RoomDto) => {
    if (!room) {
      return <div>Chybějící data místnosti</div>;
    }
    return (
      <div className={styles.roomContent}>
        <h3>{room.type}</h3>
        <p>{room.description}</p>
      </div>
    );
  };

  const renderHallContent = (hall: HallDto) => {
    if (!hall) {
      return <div>Chybějící data haly</div>;
    }
    return (
      <div className={styles.hallContent}>
        <h2>Hall{hall.id}</h2>
      </div>
    );
  };

  const renderForkContent = (fork: ForkDto) => {
    if (!fork) {
      return <div>Chybějící data větvení</div>;
    }
    return (
      <div className={styles.forkContent}>
        <h2>Fork</h2>
        {fork.data.map((room) => (
          <button
            key={room.id}
            onClick={() => {
              const roomIndex = chain?.findIndex(
                (item) => item.type === 'room' && item.data.id === room.id
              );
              if (roomIndex !== undefined && roomIndex !== -1) {
                setCurrentChainIndex(roomIndex);
              }
            }}
            className={styles.forkButton}
          >
            {room.type}
          </button>
        ))}
      </div>
    );
  };

  if (!chain || chain.length === 0) {
    return <div className={styles.ViewContainercontainer}>No chain data available.</div>;
  }

  const currentItem = chain[currentChainIndex];

  if (!currentItem) {
    return <div className={styles.Viewcontainer}>Aktuální pozice nenalezena</div>;
  }

  return (
    <div className={styles.ViewContainer}>
      {backgroundImageUrl && (
        <div
          className={styles.hallBackground}
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}

      {/* Zbytek obsahu */}
      {currentItem.type === 'room' && renderRoomContent(currentItem.data)}
      {currentItem.type === 'hall' && renderHallContent(currentItem.data)}
      {currentItem.type === 'fork' && renderForkContent(currentItem)}

      <div className={styles.navigation}>
        <Button onClick={handlePrevious} disabled={currentChainIndex === 0}>Previous</Button>
        <Button onClick={handleNext} disabled={currentChainIndex === chain.length - 1}>Next</Button>
      </div>
    </div>
  );
};

export default RoomViewer;