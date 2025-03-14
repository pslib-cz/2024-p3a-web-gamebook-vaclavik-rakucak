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
        <div className={styles.buttonContainer}>
          <div><RouteButton route="/Town/Tavern" label="Tavern" /></div>
          <div><RouteButton route="/Map" label="Map"/></div>
          <div><RouteButton route="/Town/Blacksmith" label="Shopkeeper"/></div>
        </div>
    </div>
  );
};

export default TownPage;