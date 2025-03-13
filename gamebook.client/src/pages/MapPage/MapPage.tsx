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
import axios from 'axios';

const MapButton: React.FC<Dungeon & { onClick: () => void }> = ({ name, imageId, onClick }) => {
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

  return (
    <div className={styles.mapButton}>
      <Button onClick={onClick}>{name}</Button>
      <img
        src={dungeonImageUrl}
        alt="dungeon icon"
        className={styles.mapButtonIcon}
        onClick={onClick}
      />
    </div>
  );
};

const MainMapPage: React.FC = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
  const [dungeons, setDungeons] = useState<Dungeon[]>([]);
  const [selectedDungeon, setSelectedDungeon] = useState<Dungeon | null>(null);
  const { setDungeonId, setCurrentChainIndex, weapon, setChain } = useGameContext();
  const baseApiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

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
        const response = await axios.get(`${baseApiUrl}/Dungeons`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch dungeons');
        }
        const data: Dungeon[] = response.data;
        setDungeons(data);
      } catch (error) {
        console.error('Error fetching dungeons:', error);
      }
    };

    loadImage();
    fetchDungeons();
  }, [baseApiUrl]);

  const handleEnterDungeon = (dungeonId: number) => {
    if ((weapon?.dmg ?? 0) >= (selectedDungeon?.dmgCondition ?? Infinity)) {
      setChain(null);
      setDungeonId(dungeonId.toString());
      setCurrentChainIndex(0);
      localStorage.setItem('firstEntry', 'true');
      navigate(`/Dungeon/${dungeonId}/room/0`);
    }
  };

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
            <MapButton {...dungeon} onClick={() => setSelectedDungeon(dungeon)} />
          </div>
        ))}
        <div className={styles.Town}>
          <RouteButton route="/Town" label="Town" />
        </div>
        <div className={styles.Town2} style={{ height: '30%', width: '30%', cursor: 'pointer' }}>
          <RouteButton route="/Town" nonvisible />
        </div>
      </div>
      {selectedDungeon && (
        <DungeonCard
          dungeon={selectedDungeon}
          onClose={() => setSelectedDungeon(null)}
          onEnter={handleEnterDungeon}
          playerDamage={weapon ? weapon.dmg : 0}
        />
      )}
    </div>
  );
};

export default MainMapPage;