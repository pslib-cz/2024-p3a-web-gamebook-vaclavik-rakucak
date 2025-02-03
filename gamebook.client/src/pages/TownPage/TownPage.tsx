import React, { useState, useEffect } from 'react';
import { fetchImage } from '../../api/imagesApi';
import styles from './TownPage.module.css';
import RouteButton from '../../components/Buttons/routeButtons/routeButton.tsx';

const TownPage: React.FC = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');

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
        <RouteButton route="/Tavern" label="Tavern" />
        <RouteButton route="/Blacksmith" label="Blacksmith"/>
        <RouteButton route="/Map" label="Map"/>
    </div>
  );
};

export default TownPage;