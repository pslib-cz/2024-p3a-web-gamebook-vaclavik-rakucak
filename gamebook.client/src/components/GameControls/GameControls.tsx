import React from 'react';
import { useGameContext } from '../../contexts/GameContext';
import styles from './GameControls.module.css';

const GameControls: React.FC = () => {
  const { exportGameState, importGameState } = useGameContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importGameState(file);
    }
  };

  return (
    <div className={styles.gameControls}>
        <div className={styles.export}><button onClick={exportGameState}>Export Game</button></div>
        <div className={styles.import}>
            <button>Import Game</button>
            <input type="file" accept=".json" onChange={handleFileChange} />
        </div>
    </div>
  );
};

export default GameControls;