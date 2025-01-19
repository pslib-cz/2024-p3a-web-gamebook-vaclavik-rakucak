import { useState, useEffect } from 'react';
import React from 'react';
import styles from './MapPage.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchImage } from '../../api/imagesApi';
import Button from '../../components/Buttons/ButtonSmall/ButtonSmall';
import RouteButton from '../../components/Buttons/routeButtonSmall/routeButton';
import { useGameContext } from '../../contexts/GameContext';

type MapButtonProps = {
  dungeonId: number;
  label: string;
};

const MapButton: React.FC<MapButtonProps> = ({ dungeonId, label }) => {
  const navigate = useNavigate();
  const { setDungeonId, setCurrentChainIndex } = useGameContext();

  const handleClick = () => {
    setDungeonId(dungeonId.toString());
    setCurrentChainIndex(0);
    localStorage.setItem('firstEntry', 'true');
    navigate(`/Dungeon/${dungeonId}/room/0`);
  };

  return (
    <div className={styles.mapButton}>
      <Button onClick={handleClick}>{label}</Button>
      <img
        src="/public/dungeon-icon.webp"
        alt="dungeon icon"
        className={styles.mapButtonIcon}
        onClick={handleClick}
      />
    </div>
  );
};

const MainMapPage: React.FC = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageId = 25;
        const url = await fetchImage(imageId);
        setBackgroundImageUrl(url);
      } catch (error) {
        console.error('Error loading background image:', error);
      }
    };

    loadImage();
  }, []);

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: backgroundImageUrl
          ? `url(${backgroundImageUrl})`
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className={styles.title}>.</h1>
      <div className={styles.mapButtonContainer}>
        <div className={styles.Dungeon1}>
          <MapButton dungeonId={2} label="Dungeon 1" />
        </div>
        <div className={styles.Dungeon2}>
          <MapButton dungeonId={2} label="Dungeon 2" />
        </div>
        <div className={styles.Dungeon3}>
          <MapButton dungeonId={2} label="Dungeon 3" />
        </div>
        <div className={styles.Dungeon4}>
          <MapButton dungeonId={2} label="Dungeon 4" />
        </div>
        <div className={styles.Dungeon5}>
          <MapButton dungeonId={2} label="Dungeon 5" />
        </div>
        <div className={styles.Town}>
          <RouteButton route="/Town" label="Town" />
        </div>
        <div className={styles.Town2} style={{ height: '30%', width: '30%' }}>
          <RouteButton route="/Town" nonvisible />
        </div>
      </div>
    </div>
  );
};

export default MainMapPage;