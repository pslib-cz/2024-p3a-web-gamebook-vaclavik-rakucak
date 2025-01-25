import React from 'react';
import { Room, Monster } from '../../../types/RoomDto';
import styles from '../ChainViewer/ChainViewer.module.css';
import Button from '../../Buttons/ButtonLarge/ButtonLarge';
import { useGameContext } from '../../../contexts/GameContext';

type RoomContentProps = {
  room: Room;
  isFighting: boolean;
  monster: Monster | null;
  handleFightStart: () => void;
  handleFightEnd: (monsterId?: number) => void;
}

const RoomContent: React.FC<RoomContentProps> = ({
  room,
  isFighting,
  monster,
  handleFightStart,
  handleFightEnd,
}) => {
  const { playerHealth, setPlayerHealth, defeatedMonsters, changeHealth } = useGameContext();
  const [monsterHealth, setMonsterHealth] = React.useState<number | null>(null);
  const isMonsterDefeated = defeatedMonsters.includes(room.id);

  React.useEffect(() => {
    if (monster) {
      setMonsterHealth(monster.hitpoints);
    } else {
      setMonsterHealth(null);
    }
  }, [monster]);

  const handleAttack = () => {
    if (!monster || monsterHealth === null) return;

    const playerDamage = Math.floor(Math.random() * 5) + 1;
    const newMonsterHealth = Math.max(0, monsterHealth - playerDamage);
    setMonsterHealth(newMonsterHealth);

    if (newMonsterHealth <= 0) {
      handleFightEnd(monster.id);
      alert('Monstrum poraženo!');
      return;
    }

    const damageTaken = Math.floor(Math.random() * monster.damage) + 1;
    changeHealth(-damageTaken)
    if (playerHealth - damageTaken <= 0) {
      handleFightEnd();
      alert('You died!');
    }
  };

  return (
    <div className={styles.roomContent}>
      <h2>Místnost {room.id}</h2>
      <p>{room.description}</p>
      {!isFighting && !room.isDeadEnd && room.type === 'monster' && !isMonsterDefeated && (
        <Button onClick={handleFightStart}>Zaútočit</Button>
      )}

      {isFighting && (
        <div className={styles.fightContent}>
          <h3>Boj!</h3>
          {monster && (
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