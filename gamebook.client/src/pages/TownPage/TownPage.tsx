import React, { useState, useEffect } from 'react';
import { fetchImage } from '../../api/imagesApi';
import styles from './TownPage.module.css';
import RouteButton from '../../components/Buttons/routeButtons/routeButton.tsx';
import Burgir from '../../components/Burgir/Burgir';
import PauseMenu from '../../components/PauseMenu/PauseMenu.tsx';

const TownPage: React.FC = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
  const [isPauseMenuOpen, setIsPauseMenuOpen] = useState<boolean>(false);
  const togglePauseMenu = () => {
    setIsPauseMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageId = 24;
        const url = await fetchImage(imageId);
        setBackgroundImageUrl(url);
      } catch (error) {
        console.error('Error loading background image:', error);
      }
    };

    loadImage();
  }, []);

  return (
    <div className={styles.townPage}
        style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', top: '0', right: '0', zIndex: 100 }}>
          <Burgir onClick={togglePauseMenu} isOpen={isPauseMenuOpen}/>
        </div>
        {isPauseMenuOpen && <PauseMenu onClose={togglePauseMenu} currentPage='Town' />}
        <RouteButton route="/Town/Tavern" label="Tavern" />
        <RouteButton route="/Town/Blacksmith" label="Blacksmith"/>
        <RouteButton route="/Map" label="Map"/>
    </div>
  );
};

export default TownPage;