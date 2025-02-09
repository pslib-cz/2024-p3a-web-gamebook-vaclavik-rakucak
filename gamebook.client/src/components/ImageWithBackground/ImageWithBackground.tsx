import React from 'react';
import styles from './ImageWithBackground.module.css';

interface ImageWithBackgroundProps {
  imageUrl: string;
  rarity: string;
  altText: string;
}

const ImageWithBackground: React.FC<ImageWithBackgroundProps> = ({ imageUrl, rarity, altText }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.imageContainer} ${styles[rarity]}`}>
        <img src={imageUrl} alt={altText} className={styles.image} />
      </div>
    </div>
  );
};

export default ImageWithBackground;