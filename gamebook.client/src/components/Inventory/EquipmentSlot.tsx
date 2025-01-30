import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styles from './EquipmentSlot.module.css';
import { useGameContext } from '../../contexts/GameContext';
import Button from '../Buttons/ButtonSmall/ButtonSmall';

const EquipmentSlot: React.FC = () => {
  const { weapon, setWeapon, shield, setShield, armor, setArmor, changeCoins } = useGameContext();
  const [images, setImages] = useState<{ [key: number]: string }>({});
  const [hoveredItem, setHoveredItem] = useState<any>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const fetchImages = async () => {
      const storedItems = sessionStorage.getItem('equippedItems');
      if (storedItems) {
        const items = JSON.parse(storedItems);
        const imagePromises = items.map((item: any) =>
          axios.get(`https://localhost:7190/api/Images/${item.imageId}`, { responseType: 'blob' })
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

  const handleUseItem = (item: any) => {
    if (item.type === 'Miscellaneous') {
      // Remove item from inventory
    } else {
      if (item.type === 'Weapon') setWeapon(item);
      if (item.type === 'Shield') setShield(item);
      if (item.type === 'Armor') setArmor(item);
    }
  };

  const handleSellItem = (item: any) => {
    changeCoins(item.price);
    // Remove item from inventory
  };

  const handleHover = (item: any) => {
    if (!isMobile) {
      setHoveredItem(item);
    }
  };

  const handleClick = (item: any) => {
    if (isMobile) {
      setHoveredItem(item);
    }
  };

  const isInTown = location.pathname.includes('/Town');

  return (
    <div className={styles.equipmentSlot}>
      <div className={styles.slot} onMouseEnter={() => handleHover(weapon)} onClick={() => handleClick(weapon)}>
        {weapon && (
          <>
            <div className={styles.imageContainer}><img src={images[weapon.imageId]} alt={weapon.name} className={styles.image} /></div>
            {hoveredItem === weapon && (
              <div className={styles.info}>
                <p>{weapon.name}</p>
                <p>Damage: {weapon.dmg}</p>
                <p>Rarity: {weapon.rarity}</p>
                <Button onClick={() => handleUseItem(weapon)}>Use</Button>
                {isInTown && <Button onClick={() => handleSellItem(weapon)}>Sell</Button>}
              </div>
            )}
          </>
        )}
      </div>
      <div className={styles.slot} onMouseEnter={() => handleHover(shield)} onClick={() => handleClick(shield)}>
        {shield && (
          <>
            <div className={styles.imageContainer}><img src={images[shield.imageId]} alt={shield.name} className={styles.image} /></div>
            {hoveredItem === shield && (
              <div className={styles.info}>
                <p>{shield.name}</p>
                <p>Damage: {shield.dmg}</p>
                <p>Rarity: {shield.rarity}</p>
                <Button onClick={() => handleUseItem(shield)}>Use</Button>
                {isInTown && <Button onClick={() => handleSellItem(shield)}>Sell</Button>}
              </div>
            )}
          </>
        )}
      </div>
      <div className={styles.slot} onMouseEnter={() => handleHover(armor)} onClick={() => handleClick(armor)}>
        {armor && (
          <>
            <div className={styles.imageContainer}><img src={images[armor.imageId]} alt={armor.name} /></div>
            {hoveredItem === armor && (
              <div className={styles.info}>
                <p>{armor.name}</p>
                <p>Damage: {armor.dmg}</p>
                <p>Rarity: {armor.rarity}</p>
                <Button onClick={() => handleUseItem(armor)}>Use</Button>
                {isInTown && <Button onClick={() => handleSellItem(armor)}>Sell</Button>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EquipmentSlot;