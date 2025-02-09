import React, { useState, useEffect } from 'react';
import { useGameContext } from '../../contexts/GameContext';
import styles from './EquipmentSlot.module.css';
import Button from '../Buttons/ButtonSmall/ButtonSmall';
import { Item } from '../../types/ViewModels';
import axios from 'axios';
import ImageWithBackground from '../ImageWithBackground/ImageWithBackground';

const EquipmentSlot: React.FC = () => {
  const { weapon, shield, armor, setWeapon, setShield, setArmor, changeCoins, items, setItems } = useGameContext();
  const [images, setImages] = useState<{ [key: number]: string }>({});
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const baseApiUrl = import.meta.env.VITE_API_URL;

  const fetchImages = async (equippedItems: { weapon: Item | null, shield: Item | null, armor: Item | null }) => {
    const imagePromises = Object.values(equippedItems)
      .filter(item => item !== null)
      .map((item: Item | null) =>
        axios.get(`${baseApiUrl}/Images/${item!.imageId}`, { responseType: 'blob' })
      );
    const imageResponses = await Promise.all(imagePromises);
    const imageMap: { [key: number]: string } = {};
    imageResponses.forEach((response, index) => {
      const url = URL.createObjectURL(response.data);
      const item = Object.values(equippedItems).filter(item => item !== null)[index];
      imageMap[item!.imageId] = url;
    });
    setImages(imageMap);
  };

  useEffect(() => {
    const equippedItems = { weapon, shield, armor };
    fetchImages(equippedItems);
    setIsMobile(window.innerWidth <= 768);
  }, [weapon, shield, armor]);

  useEffect(() => {
    const equippedItems = { weapon, shield, armor };
    sessionStorage.setItem('equippedItems', JSON.stringify(equippedItems));
  }, [weapon, shield, armor]);

  const removeItem = (itemId: number) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    sessionStorage.setItem('backpackItems', JSON.stringify(updatedItems));
  };

  const handleUnEquipItem = (item: Item) => {
    if (item.type === 'Weapon') {
      setWeapon(null);
    } else if (item.type === 'Shield') {
      setShield(null);
    } else if (item.type === 'Armor') {
      setArmor(null);
    }
    const updatedItems = [...items, item];
    setItems(updatedItems);
    sessionStorage.setItem('backpackItems', JSON.stringify(updatedItems));
  };

  const handleClick = (item: Item | null) => {
    setHoveredItem(prevItem => (prevItem === item ? null : item));
  };

  const isInTown = location.pathname.includes('/Blacksmith');

  return (
    <div className={styles.equipmentSlot}>
      <h2>Equipment</h2>
      <div className={styles.slot} onClick={() => handleClick(weapon)}>
        {weapon && (
          <>
            <div className={styles.imageContainer}>
              <ImageWithBackground
                imageUrl={images[weapon.imageId]}
                rarity={weapon.rarity}
                altText={weapon.name}
              />
            </div>
            {hoveredItem === weapon && (
              <div className={styles.info}>
                <Button onClick={() => handleUnEquipItem(weapon)}>Unequip</Button>
              </div>
            )}
            <div className={styles.sideInfo}>
              <p>{weapon.name}</p>
              <p>Damage: {weapon.dmg}</p>
            </div>
          </>
        )}
      </div>
      <div className={styles.slot} onClick={() => handleClick(shield)}>
        {shield && (
          <>
            <div className={styles.imageContainer}>
              <ImageWithBackground
                imageUrl={images[shield.imageId]}
                rarity={shield.rarity}
                altText={shield.name}
              />
            </div>
            {hoveredItem === shield && (
              <div className={styles.info}>
                <Button onClick={() => handleUnEquipItem(shield)}>Unequip</Button>
              </div>
            )}
            <div className={styles.sideInfo}>
              <p>{shield.name}</p>
              <p>Defense: {shield.dmg} %</p>
            </div>
          </>
        )}
      </div>
      <div className={styles.slot} onClick={() => handleClick(armor)}>
        {armor && (
          <>
            <div className={styles.imageContainer}>
              <ImageWithBackground
                imageUrl={images[armor.imageId]}
                rarity={armor.rarity}
                altText={armor.name}
              />
            </div>
            {hoveredItem === armor && (
              <div className={styles.info}>
                <Button onClick={() => handleUnEquipItem(armor)}>Unequip</Button>
              </div>
            )}
            <div className={styles.sideInfo}>
              <p>{armor.name}</p>
              <p>Defense: {armor.dmg}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EquipmentSlot;