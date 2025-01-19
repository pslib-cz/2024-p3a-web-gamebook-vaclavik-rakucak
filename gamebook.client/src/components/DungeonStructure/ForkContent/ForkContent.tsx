import React from 'react';
import { ForkDto } from '../../../types/RoomDto';
import styles from './RoomViewer.module.css';
import { useGameContext } from '../../../contexts/GameContext';

interface ForkContentProps {
  fork: ForkDto;
}

const ForkContent: React.FC<ForkContentProps> = ({ fork }) => {
  const { chain, setCurrentChainIndex, dungeonId } = useGameContext();

  const handleRoomSelect = (roomId: number) => {
    if (!chain || !dungeonId) return;

    const forkIndex = chain.findIndex(
      (item) => item.type === 'fork' && item.data.id === fork.id
    );

    if (forkIndex === -1) return;

    for (let i = forkIndex + 1; i < chain.length; i++) {
      if (chain[i].type === 'room' && chain[i].data.id === roomId) {
        setCurrentChainIndex(i);
        break;
      } else if (chain[i].type === 'fork') {
        break;
      }
    }
  };

  return (
    <div className={styles.forkContent}>
      <h2>Rozcestí</h2>
      <p>Vyberte místnost:</p>
      <ul>
        {fork.data.map((forkData) => (
          <li key={forkData.room.id}>
            <button onClick={() => handleRoomSelect(forkData.room.id)}>
              Místnost {forkData.room.id}{' '}
              {forkData.isDeadEnd ? '(Slepá ulička)' : ''}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForkContent;