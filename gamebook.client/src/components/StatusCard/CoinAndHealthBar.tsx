import {useState} from 'react';
import { useGameContext } from '../../contexts/GameContext';
import styles from './CoinAndHealthBar.module.css';

const CoinAndHealthBar: React.FC = () => {
  const { playerHealth, maxPlayerHealth, setPlayerHealth } = useGameContext();
  const [coins, setCoins] = useState<number>(100); // Počáteční hodnota 100 coinů

  // Funkce pro změnu počtu coinů
  const changeCoins = (amount: number) => {
    setCoins(prevCoins => Math.max(0, prevCoins + amount)); // Zajistí, že počet coinů nepůjde do záporu
  };

  // TODO: Integrace s ostatními komponentami - volání changeCoins() při získání/ztrátě coinů
  // Příklad:
  // - V RoomPage po zabití monstra: changeCoins(10); // Přidá 10 coinů
  // - V ShopPage po nákupu předmětu: changeCoins(-item.price); // Odečte cenu předmětu

  return (
    <div className={styles.bar}>
      <div className={styles.coins}>
        <span className={styles.value}>{coins}</span>
      </div>
      <div className={styles.health}>
        <span className={styles.value}>{playerHealth} / {maxPlayerHealth}</span>
      </div>
    </div>
  );
};

export default CoinAndHealthBar;