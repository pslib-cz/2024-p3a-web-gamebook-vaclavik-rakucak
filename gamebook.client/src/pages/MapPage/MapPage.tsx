import { useEffect, useState } from 'react';
import React from 'react';
import styles from './MapPage.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchImage } from '../../api/imagesApi';

type MapButtonProps = {
  roomId: number;
  label: string;
}

const MapButton: React.FC<MapButtonProps> = ({ roomId, label }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/room/${roomId}`);
  };

  return (
    <button className={styles.mapButton} onClick={handleClick}>
      <img src="/public/dungeon-icon.webp" alt="dungeon icon" className={styles.mapButtonIcon}/>
      {label}
    </button>
  );
};


const MainMapPage: React.FC = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
  
    useEffect(() => {
      const loadImage = async () => {
        try {
          const imageId = 1;
          const url = await fetchImage(imageId);
          setBackgroundImageUrl(url);
        } catch (error) {
          console.error('Error loading background image:', error);
        }
      };
  
      loadImage();
    }, []);
    
    return (
        <div className={styles.container} style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className={styles.title}>Welcome to the Map Page</h1>
            <div className={styles.mapButtons}>
                <MapButton roomId={2} label="Dungeon 1"/>
                <MapButton roomId={2} label="Dungeon 2" />
            </div>
        </div>
    );
};

export default MainMapPage;