import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Backpack.module.css';
import { useGameContext } from '../../contexts/GameContext';
import Button from '../Buttons/ButtonSmall/ButtonSmall';
import { Item } from '../../types/ViewModels';
import ImageWithBackground from '../ImageWithBackground/ImageWithBackground';

const Backpack: React.FC = () => {
  const [images, setImages] = useState<{ [key: number]: string }>({});
  const { items, setItems, weapon, shield, armor, setWeapon, setShield, setArmor, changeCoins, changeHealth } = useGameContext();
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const baseApiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchImages = async () => {
      const storedItems = sessionStorage.getItem('backpackItems');
      if (storedItems) {
        const items: Item[] = JSON.parse(storedItems);
        if (Array.isArray(items)) {
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
        } else {
          console.error('Stored items are not an array:', items);
        }
      }
    };

    fetchImages();
    setIsMobile(window.innerWidth <= 768);
  }, [items]);

  const handleEquipItem = (item: Item) => {
    let equippedItem = null;
  
    if (item.type === 'Weapon' && weapon) {
      equippedItem = weapon;
    } else if (item.type === 'Shield' && shield) {
      equippedItem = shield;
    } else if (item.type === 'Armor' && armor) {
      equippedItem = armor;
    }
  
    if (equippedItem) {
      alert(`You already have a ${item.type.toLowerCase()} equipped: ${equippedItem.name}`);
      return;
    }
  
    if (item.type === 'Weapon') {
      setWeapon(item);
    } else if (item.type === 'Shield') {
      setShield(item);
    } else if (item.type === 'Armor') {
      setArmor(item);
    }
  
    removeItem(item.id);
  };

  const removeItem = (itemId: number) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    sessionStorage.setItem('backpackItems', JSON.stringify(updatedItems));
  };

  const handleClick = (item: Item | null) => {
    setHoveredItem(prevItem => (prevItem === item ? null : item));
  };

  const handleSellItem = (item: Item) => {
    if (item.type !== 'Key') {
      changeCoins(item.price);
      removeItem(item.id);
    }
  };

  const handleUseItem = (item: Item) => {
    if (item.type === 'Key') {
    } else {
      changeHealth(item.dmg);
      item.quantity = (item.quantity || 1) - 1;
      if (item.quantity === 0) {
        removeItem(item.id);
      }
    }
  };

  const isInTown = location.pathname.includes('/Blacksmith');

  return (
    <div className={styles.backpack}>
      {items.length === 0 ? (
        <p>Inventář je prázdný</p>
      ) : (
        items.map((item: Item) => (
          <div key={item.id} className={styles.backpackItem} onClick={() => handleClick(item)}>
            <div className={styles.imgContainer}>
              <ImageWithBackground
                imageUrl={images[item.imageId]}
                rarity={item.rarity}
                altText={item.name}
              />
            </div>
            {hoveredItem === item && (
              <div className={styles.info}>
                <p>{item.name}</p>
                <p>Damage: {item.dmg}</p>
                <p>Rarity: {item.rarity}</p>
                
                <Button onClick={() => item.type === 'Miscellaneous' || item.type === 'Key' ? handleUseItem(item) : handleEquipItem(item)}>
                  {item.type === 'Miscellaneous' || item.type === 'Key' ? 'Use' : 'Equip'}
                </Button>
                {isInTown && item.type !== 'Key' && <Button onClick={() => handleSellItem(item)}>Sell</Button>}
              </div>
            )}
            {(item.type === 'Miscellaneous' || item.type === 'Key') && <span className={styles.quantity}>{item.quantity}</span>}
          </div>
        ))
      )}
    </div>
  );
};

export default Backpack;