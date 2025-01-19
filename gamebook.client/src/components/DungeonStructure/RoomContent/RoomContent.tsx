import React from 'react';
import { RoomDto } from '../../../types/RoomDto';
import styles from './RoomViewer.module.css';
import Button from '../../Buttons/ButtonLarge/ButtonLarge';
import { useGameContext } from '../../../contexts/GameContext';

type Monster = {
  id: number;
  name: string;
  hitpoints: number;
  damage: number;
  imageId: number;
};

interface RoomContentProps {
  room: RoomDto;
  isFighting: boolean;
  monster: Monster | null;
  monsterLoading: boolean;
  monsterError: string | null;
  handleFightStart: () => void;
  handleFightEnd: () => void;
}

const RoomContent: React.FC<RoomContentProps> = ({
  room,
  isFighting,
  monster,
  monsterLoading,
  monsterError,
  handleFightStart,
  handleFightEnd,
}) => {
  const { playerHealth, setPlayerHealth } = useGameContext();
  const [monsterHealth, setMonsterHealth] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (monster) {
      setMonsterHealth(monster.hitpoints);
    } else {
      setMonsterHealth(null);
    }
  }, [monster]);

  const handleAttack = () => {
    if (!monster || monsterHealth === null) return;

    // Hráč útočí na monstrum
    const playerDamage = Math.floor(Math.random() * 5) + 1; // Náhodný útok hráče (1-5)
    const newMonsterHealth = Math.max(0, monsterHealth - playerDamage);
    setMonsterHealth(newMonsterHealth);

    // Kontrola, zda monstrum neumřelo
    if (newMonsterHealth <= 0) {
      handleFightEnd();
      alert('Monstrum poraženo!'); // Místo alertu může být hezčí modální okno
      return;
    }

    // Monstrum útočí na hráče
    const damageTaken = Math.floor(Math.random() * monster.damage) + 1;
    setPlayerHealth(Math.max(0, playerHealth - damageTaken));

    // Kontrola, zda hráč neumřel
    if (playerHealth - damageTaken <= 0) {
      handleFightEnd();
      alert('You died!'); // Místo alertu může být hezčí modální okno nebo navigace na obrazovku prohry
    }
  };

  return (
    <div className={styles.roomContent}>
      <h2>Místnost {room.id}</h2>
      <p>{room.description}</p>
      {!isFighting && !room.isDeadEnd && (
        <Button onClick={handleFightStart}>Zaútočit</Button>
      )}

      {isFighting && (
        <div className={styles.fightContent}>
          <h3>Boj!</h3>
          {monsterLoading && <p>Nahrávám monstrum...</p>}
          {monsterError && (
            <p>Chyba při nahrávání monstra: {monsterError}</p>
          )}
          {monster && !monsterLoading && !monsterError && (
            <>
              <p>Bojujete s {monster.name}!</p>
              <p>Monstrum HP: {monsterHealth !== null ? monsterHealth : 'N/A'}</p>
              <Button onClick={handleAttack}>Zaútočit</Button>
            </>
          )}
          <Button onClick={handleFightEnd}>Ukončit boj</Button>
        </div>
      )}
    </div>
  );
};

export default RoomContent;