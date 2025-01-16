import { useEffect, useState } from 'react';
import React from 'react';
import styles from './MapPage.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchImage } from '../../api/imagesApi';
import Button from '../../components/Buttons/ButtonSmall/ButtonSmall.tsx';
import RouteButton from '../../components/Buttons/routeButtonSmall/routeButton.tsx';

type MapButtonProps = {
  roomId: number;
  label: string;
}

const MapButton: React.FC<MapButtonProps> = ({ roomId, label}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Dungeon/${roomId}`);
  };

  return (
    <div className={styles.mapButton}>
      <Button onClick={handleClick}>{label}</Button>
      <img src="/public/dungeon-icon.webp" alt="dungeon icon" className={styles.mapButtonIcon} onClick={handleClick}/>
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
        <div className={styles.container} style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <h1 className={styles.title}>.</h1>
            <div className={styles.mapButtonContainer}>
              <div className={styles.Dungeon1}><MapButton roomId={2} label='Dungeon 1'/></div>
              <div className={styles.Dungeon2}><MapButton roomId={2} label='Dungeon 2'/></div>
              <div className={styles.Dungeon3}><MapButton roomId={2} label='Dungeon 3'/></div>
              <div className={styles.Dungeon4}><MapButton roomId={2} label='Dungeon 4'/></div>
              <div className={styles.Dungeon5}><MapButton roomId={2} label='Dungeon 5'/></div>
              <div className={styles.Town}><RouteButton route="/Town" label="Town"/></div>
              <div className={styles.Town2} style={{height: '30%', width: '30%'}}><RouteButton route='/Town' nonvisible/> </div>
            </div>
        </div>
    );
};

export default MainMapPage;