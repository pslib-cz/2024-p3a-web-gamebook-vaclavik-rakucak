import { useState, useEffect } from 'react';
import React from 'react';
import styles from './MapPage.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchImage } from '../../api/imagesApi';
import Button from '../../components/Buttons/ButtonSmall/ButtonSmall';
import RouteButton from '../../components/Buttons/routeButtonSmall/routeButton';
import { useGameContext } from '../../contexts/GameContext';
import { Dungeon } from '../../types/ViewModels';
import DungeonCard from '../../components/DungeonCard/DungeonCard';

const MapButton: React.FC<Dungeon> = ({ id, name, description, rewardMoney, dmgCondition, imageId }) => {
  const navigate = useNavigate();
  const { setDungeonId, setCurrentChainIndex, weapon } = useGameContext();
  const [isDungeonCardOpen, setIsDungeonCardOpen] = useState(false);
  const [dungeonImageUrl, setDungeonImageUrl] = useState<string>('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = await fetchImage(imageId);
        setDungeonImageUrl(url);
      } catch (error) {
        console.error('Error loading dungeon image:', error);
      }
    };

    loadImage();
  }, [imageId]);

  const handleClick = () => {
    setIsDungeonCardOpen(true);
  };

  const handleEnterDungeon = (dungeonId: number) => {
    if (weapon ? weapon.dmg : 0 >= dmgCondition) {
        setDungeonId(dungeonId.toString());
        setCurrentChainIndex(0);
        localStorage.setItem('firstEntry', 'true');
        navigate(`/Dungeon/${dungeonId}/room/0`);
    }
  };

  return (
    <div className={styles.mapButton}>
      <Button onClick={handleClick}>{name}</Button>
      <img
        src={dungeonImageUrl}
        alt="dungeon icon"
        className={styles.mapButtonIcon}
        onClick={handleClick}
      />
      {isDungeonCardOpen && (
        <DungeonCard
          dungeon={{ id, name, description, rewardMoney, dmgCondition, imageId }}
          onClose={() => setIsDungeonCardOpen(false)}
          onEnter={handleEnterDungeon} 
          playerDamage={weapon ? weapon.dmg : 0}
        />
      )}
    </div>
  );
};

const MainMapPage: React.FC = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
  const [dungeons, setDungeons] = useState<Dungeon[]>([]);

  const baseApiUrl = import.meta.env.VITE_API_URL;

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

    const fetchDungeons = async () => {
      try {
        const response = await fetch(`${baseApiUrl}/Dungeons`);
        if (!response.ok) {
          throw new Error('Failed to fetch dungeons');
        }
        const data: Dungeon[] = await response.json();
        setDungeons(data);
      } catch (error) {
        console.error('Error fetching dungeons:', error);
      }
    };

    loadImage();
    fetchDungeons();
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
      <div className={styles.mapButtonContainer}>
        {dungeons.map((dungeon) => (
          <div key={dungeon.id} className={styles[`Dungeon${dungeon.id}`]}>
            <MapButton {...dungeon} />
          </div>
        ))}
        <div className={styles.Town}>
          <RouteButton route="/Town" label="Town" />
        </div>
        <div className={styles.Town2} style={{ height: '30%', width: '30%', cursor: 'pointer' }}>
          <RouteButton route="/Town" nonvisible />
        </div>
      </div>
    </div>
  );
};

export default MainMapPage;