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
  const { changeCoins, changeHealth, weapon, armor, shield } = useGameContext();
  const [monsterHealth, setMonsterHealth] = useState<number>(0);
  const [maxMonsterHealth, setMaxMonsterHealth] = useState<number>(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [monster, setMonster] = useState<Monster | null>(null);
  const [monsterImage, setMonsterImage] = useState<string | null>(null);

  const baseApiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchMonsterData = async () => {
      setIsLoading(true);
      try {
        const randomMonsterId = getRandomMonsterId();
        const response = await fetch(`${baseApiUrl}/monsters/${randomMonsterId}`);
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

  useEffect(() => {
    const fetchMonsterImage = async (imageId: number) => {
      try {
        const response = await fetch(`${baseApiUrl}/images/${imageId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch image data');
        }
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setMonsterImage(imageUrl);
      } catch (error) {
        console.error(error);
        setMonsterImage(null);
      }
    };

    if (monster && monster.imageId) {
      fetchMonsterImage(monster.imageId);
    } else {
      setMonsterImage(null);
    }
  }, [monster]);

  useEffect(() => {
    if (!isPlayerTurn && monsterHealth > 0) {
      const timeoutId = setTimeout(() => {
        if (monster) {
          let damage = monster.damage - armor.dmg;
          
          // Přidáme logiku pro procento šance na znegování poškození
          const negateChance = shield.dmg;
          const randomValue = Math.random() * 100; // Náhodná hodnota mezi 0 a 100
        
          if (randomValue < negateChance) {
            damage = 0; // Znegování poškození
            console.log(`Shield negates the damage!`);
            alert('Damage was negated by the shield!');
          } else {
            damage = Math.max(0, damage);
          }
        
          changeHealth(-damage);
          setIsPlayerTurn(true);
          console.log(`Monster attacks! Player takes ${damage} damage.`);
        }
      }, 1000);
  
      return () => clearTimeout(timeoutId);
    }
  }, [isPlayerTurn, monster, monsterHealth]);
  
  const handlePlayerAttack = () => {
    if (isPlayerTurn && monster) {
      const damage = weapon.dmg;
      setMonsterHealth(prevHealth => {
        const newHealth = Math.max(0, prevHealth - damage);
        if (newHealth === 0) {
          changeCoins(10);
          setTimeout(() => onFightEnd(monster.id), 0); 
          console.log("Monster defeated!");
        }
        return newHealth;
      });
      setIsPlayerTurn(false);
      console.log(`Player attacks! Monster takes ${damage} damage.`);
    }
  };

  const getRandomMonsterId = () => {
    return 1; // Vrací prvního monstra pro testování
  };

  // Uvolnění URL objektu
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
          <div className={styles.healthBarWrapper}>
            <img src='/public/heart.png' alt='Heart' className={styles.heartImage} />
            <div className={styles.healthBarContainer}>
              <EnemyHealthBar current={monsterHealth} max={maxMonsterHealth} />
            </div>
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