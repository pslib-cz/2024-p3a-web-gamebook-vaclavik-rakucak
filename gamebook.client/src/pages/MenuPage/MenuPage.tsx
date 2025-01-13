import React, { useState, useEffect } from 'react';
import Button from '../../components/Buttons/routeButtons/routeButton.tsx';
import styles from './MenuPage.module.css';
import { fetchImage } from '../../api/imagesApi'; // Importujte fetchImage

const MenuPage: React.FC = () => {
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
    <div
      className={styles.menuPage}
      style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className={styles.title}>Dungeonborne</h1>
      <div className={styles.buttonContainer}>
        <Button route="/Room" label="Start Game" />
        <Button route="/login" label="Admin Login" />
      </div>
    </div>
  );
};

export default MenuPage;