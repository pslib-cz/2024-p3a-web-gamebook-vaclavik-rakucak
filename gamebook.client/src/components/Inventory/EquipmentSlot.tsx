import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styles from './EquipmentSlot.module.css';
import { useGameContext } from '../../contexts/GameContext';
import Button from '../Buttons/ButtonSmall/ButtonSmall';
import { Item } from '../../types/ViewModels';

const EquipmentSlot: React.FC = () => {
  const { weapon, setWeapon, shield, setShield, armor, setArmor, changeCoins, items, setItems, changeHealth } = useGameContext();
  const [images, setImages] = useState<{ [key: number]: string }>({});
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const location = useLocation();

  const baseApiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchImages = async () => {
      const storedItems = sessionStorage.getItem('equippedItems');
      if (storedItems) {
        const equippedItems = JSON.parse(storedItems);
        const items: Item[] = [equippedItems.weapon, equippedItems.shield, equippedItems.armor].filter(Boolean);
        const imagePromises = items.map((item: Item) =>
          axios.get(`${baseApiUrl}/Images/${item.imageId}`, { responseType: 'blob' })
        );
        const imageResponses = await Promise.all(imagePromises);
        const imageMap: { [key: number]: string } = {};
        imageResponses.forEach((response, index) => {
          const url = URL.createObjectURL(response.data);
          imageMap[items[index].imageId] = url;
        });
        setImages(imageMap);
      }
    };

    fetchImages();
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    const equippedItems = { weapon, shield, armor };
    sessionStorage.setItem('equippedItems', JSON.stringify(equippedItems));
  }, [weapon, shield, armor]);

  const removeItem = (itemId: number) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    sessionStorage.setItem('backpackItems', JSON.stringify(updatedItems));
  };

  const handleSellItem = (item: Item) => {
    changeCoins(item.price);
    removeItem(item.id);
  };

  const handleClick = (item: Item | null) => {
    setHoveredItem(prevItem => (prevItem === item ? null : item));
  };

  const isInTown = location.pathname.includes('/Blacksmith');

  return (
    <div className={styles.equipmentSlot}>
      <div className={styles.slot} onClick={() => handleClick(weapon)}>
        {weapon && (
          <>
            <div className={styles.imageContainer}><img src={images[weapon.imageId]} alt={weapon.name} className={styles.image} /></div>
            {hoveredItem === weapon && (
              <div className={styles.info}>
                {isInTown && <Button onClick={() => handleSellItem(weapon)}>Sell</Button>}
              </div>
            )}
            <div className={styles.sideInfo}>
              <p>{weapon.name}</p>
              <p>Damage: {weapon.dmg}</p>
              <p>Rarity: {weapon.rarity}</p>
            </div>
          </>
        )}
      </div>
      <div className={styles.slot} onClick={() => handleClick(shield)}>
        {shield && (
          <>
            <div className={styles.imageContainer}><img src={images[shield.imageId]} alt={shield.name} className={styles.image} /></div>
            {hoveredItem === shield && (
              <div className={styles.info}>
                {isInTown && <Button onClick={() => handleSellItem(shield)}>Sell</Button>}
              </div>
            )}
            <div className={styles.sideInfo}>
              <p>{shield.name}</p>
              <p>Defense: {shield.def}</p>
              <p>Rarity: {shield.rarity}</p>
            </div>
          </>
        )}
      </div>
      <div className={styles.slot} onClick={() => handleClick(armor)}>
        {armor && (
          <>
            <div className={styles.imageContainer}><img src={images[armor.imageId]} alt={armor.name} className={styles.image} /></div>
            {hoveredItem === armor && (
              <div className={styles.info}>
                {isInTown && <Button onClick={() => handleSellItem(armor)}>Sell</Button>}
              </div>
            )}
            <div className={styles.sideInfo}>
              <p>{armor.name}</p>
              <p>Defense: {armor.def}</p>
              <p>Rarity: {armor.rarity}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EquipmentSlot;