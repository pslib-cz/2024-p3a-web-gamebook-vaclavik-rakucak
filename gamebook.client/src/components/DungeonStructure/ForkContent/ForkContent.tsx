import React from 'react';
import { Fork } from '../../../types/ViewModels';
import styles from '../ChainViewer/ChainViewer.module.css';
import { useGameContext } from '../../../contexts/GameContext';

interface ForkContentProps {
  fork: Fork; // Typ pro props je nyní Fork
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
        {/* Změna: Nyní iterujeme přes fork.connections */}
        {fork.connections.map((connection) => (
          <li key={connection.connectedRoom.id}>
            <button onClick={() => handleRoomSelect(connection.connectedRoom.id)}>
              Místnost {connection.connectedRoom.id}{' '}
              {connection.isDeadEnd ? '(Slepá ulička)' : ''}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForkContent;