import { useGameContext } from '../../contexts/GameContext';
import styles from './CoinAndHealthBar.module.css';

const CoinAndHealthBar: React.FC = () => {
  const { playerHealth, maxPlayerHealth, coins, weapon, armor, shield } = useGameContext();

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
      <div className={styles.health}>
        <img className={styles.icon} src='/public/Sword.png' alt='weapon'/>
        <span className={styles.value}>{weapon ? weapon.dmg : 0}p</span>
      </div>
      <div className={styles.health}>
        <img className={styles.icon} src='/public/Shield.png' alt='shield'/>
        <span className={styles.value}>{shield ? shield.dmg : 0}%</span>
      </div>
      <div className={styles.health}>
        <img className={styles.icon} src='/public/Armor.png' alt='armor'/>
        <span className={styles.value}>{armor ? armor.dmg : 0}p</span>
      </div>
    </div>
  );
};

export default CoinAndHealthBar;