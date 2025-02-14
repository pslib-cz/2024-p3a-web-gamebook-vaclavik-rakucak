import React, { useState, useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import styles from './FightComponent.module.css';
import EnemyHealthBar from '../EnemyHealthBar/EnemyHealthBar';
import { Monster } from '../../types/ViewModels';
import Button from '../Buttons/ButtonLarge/ButtonLarge';
import DeathCard from '../DeathCard/DeathCard';

interface FightComponentProps {
  onFightEnd: (monsterId?: number, playerDied?: boolean) => void; 
}

const FightComponent: React.FC<FightComponentProps> = ({ onFightEnd }) => {
  const { changeCoins, changeHealth, weapon, armor, shield, playerHealth, setPlayerHealth } = useGameContext();
  const [monsterHealth, setMonsterHealth] = useState<number>(0);
  const [maxMonsterHealth, setMaxMonsterHealth] = useState<number>(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [monster, setMonster] = useState<Monster | null>(null);
  const [monsterImage, setMonsterImage] = useState<string | null>(null);
  const [isPlayerDead, setIsPlayerDead] = useState<boolean>(false);

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
          const armorDmg = armor?.dmg ?? 0;
          const shieldDmg = shield?.dmg ?? 0;
          const monsterDamage = monster?.damage ?? 0;

          let damage = monsterDamage - armorDmg;

          //logika pro procento šance na znegování poškození
          const negateChance = shieldDmg;
          const randomValue = Math.random() * 100; // Náhodná hodnota mezi 0 a 100

          if (randomValue < negateChance) {
            damage = 0; // Znegování poškození
            console.log(`Shield negates the damage!`);
            alert('Damage was negated by the shield!');
          } else {
            damage = Math.max(0, damage);
          }

          changeHealth(-damage);
          if (playerHealth - damage <= 0) {
            setIsPlayerDead(true);
            setIsPlayerTurn(false);
          } else {
            setIsPlayerTurn(true);
          }
          console.log(`Monster attacks! Player takes ${damage} damage.`);
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [isPlayerTurn, monster, monsterHealth, playerHealth]);

  const handlePlayerAttack = () => {
    if (isPlayerTurn && monster) {
      const weaponDmg = weapon?.dmg ?? 0;
      setMonsterHealth(prevHealth => {
        const newHealth = Math.max(0, prevHealth - weaponDmg);
        if (newHealth === 0) {
          changeCoins(10);
          setTimeout(() => onFightEnd(monster.id), 0);
          console.log("Monster defeated!");
        }
        return newHealth;
      });
      setIsPlayerTurn(false);
      console.log(`Player attacks! Monster takes ${weaponDmg} damage.`);
    }
  };

  const getRandomMonsterId = () => {
    return 1; // Vrací prvního monstra pro testování
  };

  const handleRespawn = () => {
    setPlayerHealth(50); // Reset player health to 50
    setIsPlayerDead(false); // Hide DeathCard
    onFightEnd(undefined, true); // End the fight and return to the map
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

  if (isPlayerDead) {
    return <DeathCard onRespawn={handleRespawn} />; // Show DeathCard if player is dead
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
          <img src='/heart.png' alt='Heart' className={styles.heartImage} />
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