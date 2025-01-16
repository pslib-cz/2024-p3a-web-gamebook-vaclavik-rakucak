import React, { useState, useEffect } from 'react';
import Button from '../../components/Buttons/routeButtons/routeButton.tsx';
import { fetchImage } from '../../api/imagesApi';
import styles from './ShopPage.module.css'
import RouteButton from '../../components/Buttons/routeButtons/routeButton.tsx';

const ShopPage: React.FC = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageId = 26;
        const url = await fetchImage(imageId);
        setBackgroundImageUrl(url);
      } catch (error) {
        console.error('Error loading background image:', error);
      }
    };

    loadImage();
  }, []);

  return (
    <div className={styles.shopPage}
        style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <RouteButton route="/Town" label="Town"/>
    </div>
  );
};

export default ShopPage;