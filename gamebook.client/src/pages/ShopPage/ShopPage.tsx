import React, { useState, useEffect } from 'react';
import Button from '../../components/Buttons/routeButtons/routeButton.tsx';
import { fetchImage } from '../../api/imagesApi';
import styles from './ShopPage.module.css';
import RouteButton from '../../components/Buttons/routeButtons/routeButton.tsx';
import useFetch from '../../hooks/useFetch.ts';
import { useGameContext } from '../../contexts/GameContext';

type Equipment = {
  id: number;
  name: string;
  type: string;
  price: number;
  rarity: string;
  dmg: number;
  specialEffect: {
    name: string;
    description: string;
    value: number;
  } | null;
  imageId: number;
  imageUrl?: string;
}

const ShopPage: React.FC = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
  const { data: equipments, loading, error, setData } = useFetch<Equipment[]>('https://localhost:7190/api/ShopOffer/random');
  const { changeCoins } = useGameContext();

  useEffect(() => {
    const loadEquipmentImages = async (equipments: Equipment[]) => {
      const updatedEquipments = await Promise.all(
        equipments.map(async (equipment) => {
          try {
            const imageUrl = await fetchImage(equipment.imageId);
            return { ...equipment, imageUrl };
          } catch (error) {
            console.error('Error loading image for equipment:', equipment.name, error);
            return equipment;
          }
        })
      );
      if (setData) {
        setData(updatedEquipments);
      }
    };

    if (equipments) {
      loadEquipmentImages(equipments);
    }
  }, [equipments, setData]);

  // Načtení background image
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

  const handleBuyItem = async (itemId: number, itemPrice: number) => {
    const confirmPurchase = window.confirm(`Are you sure you want to buy this item for ${itemPrice} coins?`);
    if (confirmPurchase) {
      changeCoins(-itemPrice);
      console.log('Buying item:', itemId);
    }
  };

  return (
    <div
      className={styles.shopPage}
      style={{
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <RouteButton route="/Town" label="Back to Town" />

      <div className={styles.offerwall}>
        <h2>Offerwall</h2>
        {loading && <p>Loading items...</p>}
        {error && <p>Error loading items: {error}</p>}
        {!loading && !error && equipments && (
          <div className={styles.items}>
            {equipments.map((item) => (
              <div key={item.id} className={styles.item}>
                {item.imageUrl && <img src={item.imageUrl} alt={item.name} />}
                <h3>{item.name}</h3>
                <p>Type: {item.type}</p>
                <p>Rarity: {item.rarity}</p>
                <p>DMG: {item.dmg}</p>
                {item.specialEffect && (
                  <p>
                    Special Effect: {item.specialEffect.name} ({item.specialEffect.description})
                  </p>
                )}
                <p>Price: {item.price}</p>
                <button onClick={() => handleBuyItem(item.id, item.price ? item.price : 0)}>Buy</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;