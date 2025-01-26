import {useState} from 'react';
import { useGameContext } from '../../contexts/GameContext';
import styles from './CoinAndHealthBar.module.css';

const CoinAndHealthBar: React.FC = () => {
  const { playerHealth, maxPlayerHealth, setPlayerHealth, coins  } = useGameContext();


  // TODO: Integrace s ostatními komponentami - volání changeCoins() při získání/ztrátě coinů
  // - V RoomPage po zabití monstra: changeCoins(10); // Přidá 10 coinů
  // - V ShopPage po nákupu předmětu: changeCoins(-item.price); // Odečte cenu předmětu

  return (
    <div className={styles.bar}>
      <div className={styles.coins}>
        <img className={styles.icon} src='/public/coin.png' alt='coin'/>
        <span className={styles.value}>{coins}</span>
      </div>
      <div className={styles.health}>
        <img className={styles.icon} src='/public/heart.png' alt='health'/>
        <span className={styles.value}>{playerHealth} / {maxPlayerHealth}</span>
      </div>
    </div>
  );
};

export default CoinAndHealthBar;