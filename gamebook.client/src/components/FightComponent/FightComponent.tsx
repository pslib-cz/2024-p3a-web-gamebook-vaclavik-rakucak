import React, { useState, useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import styles from './FightComponent.module.css';
import EnemyHealthBar from '../EnemyHealthBar/EnemyHealthBar';
import { Monster } from '../../types/RoomDto';
import Button from '../Buttons/ButtonLarge/ButtonLarge';

interface FightComponentProps {
  onFightEnd: (monsterId?: number) => void;
}

const FightComponent: React.FC<FightComponentProps> = ({ onFightEnd }) => {
  const { changeCoins } = useGameContext();
  const [monsterHealth, setMonsterHealth] = useState<number>(0);
  const [maxMonsterHealth, setMaxMonsterHealth] = useState<number>(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [monster, setMonster] = useState<Monster | null>(null);
  const [monsterImage, setMonsterImage] = useState<string | null>(null); // State pro uložení URL obrázku

  // Fetch dat o monstru
  useEffect(() => {
    const fetchMonsterData = async () => {
      setIsLoading(true);
      try {
        const randomMonsterId = getRandomMonsterId();
        const response = await fetch(`https://localhost:7190/api/monsters/${randomMonsterId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch monster data');
        }
        const data = await response.json();
        console.log("Fetched monster data:", data);
        setMonsterHealth(data.hitpoints);
        setMaxMonsterHealth(data.hitpoints);
        setMonster(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonsterData();
  }, []);

  // Fetch obrázku monstra
  useEffect(() => {
    const fetchMonsterImage = async (imageId: number) => {
      try {
        const response = await fetch(`https://localhost:7190/api/images/${imageId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch image data');
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setMonsterImage(imageUrl);
      } catch (error) {
        console.error(error);
        setMonsterImage(null); // V případě chyby nenastavuj obrázek
      }
    };

    if (monster && monster.imageId) {
      fetchMonsterImage(monster.imageId);
    } else {
      setMonsterImage(null); // Pokud není imageId, nenastavuj obrázek
    }
  }, [monster]); // Spusť useEffect, když se změní monster

  // Útok monstra (po prodlevě a pokud je na tahu monstrum)
  useEffect(() => {
    if (!isPlayerTurn && monsterHealth > 0) {
      const timeoutId = setTimeout(() => {
        const damage = Math.floor(Math.random() * 6) + 5;
        setIsPlayerTurn(true);
        console.log(`Monster attacks! Player takes ${damage} damage.`);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isPlayerTurn, monsterHealth]);

  const handlePlayerAttack = () => {
    if (isPlayerTurn && monster) {
      const damage = Math.floor(Math.random() * 5) + 1;
      setMonsterHealth(prevHealth => {
        const newHealth = Math.max(0, prevHealth - damage);
        if (newHealth === 0) {
          changeCoins(10);
          onFightEnd(monster.id);
          console.log("Monster defeated!");
        }
        return newHealth;
      });
      setIsPlayerTurn(false);
      console.log(`Player attacks! Monster takes ${damage} damage.`);
    }
  };

  const getRandomMonsterId = () => {
    const min = 1;
    const max = 5;
    return 1; // Vrací prvního monstra pro testování, pak uprav dle potřeby
  };

  // Uvolnění URL objektu, když už ho nepotřebujeme
  useEffect(() => {
    return () => {
      if (monsterImage) {
        URL.revokeObjectURL(monsterImage);
      }
    };
  }, [monsterImage]);

  if (isLoading) {
    return <div>Loading monster data...</div>;
  }

  return (
    <div className={styles.fightContainer}>
        {monster && (
            <div className={styles.monsterInfo}>
                <h3>{monster.name}</h3>
            </div>
        )}

        <div className={styles.monsterImageContainer}>
          <div className={styles.healthBarContainer}>
            <EnemyHealthBar current={monsterHealth} max={maxMonsterHealth} />
          </div>

          {monsterImage && (
            <img
                src={monsterImage}
                alt="Monster"
                className={styles.monsterImage}
            />
          )}
        </div>

        <div className={styles.buttonContainer}>
          <Button onClick={handlePlayerAttack} disabled={!isPlayerTurn || !monster}>
              Attack
          </Button>
        </div>
    </div>
  );
};

export default FightComponent;