import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Backpack.module.css';
import { useGameContext } from '../../contexts/GameContext';
import Button from '../Buttons/ButtonSmall/ButtonSmall';
import { Item } from '../../types/RoomDto';

const Backpack: React.FC = () => {
  const [images, setImages] = useState<{ [key: number]: string }>({});
  const { items, setItems, setWeapon, setShield, setArmor, changeCoins } = useGameContext();
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
    if (item.type === 'Weapon') setWeapon(item);
    if (item.type === 'Shield') setShield(item);
    if (item.type === 'Armor') setArmor(item);
    removeItem(item.id);
  };

  const removeItem = (itemId: number) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    setItems(updatedItems);
    sessionStorage.setItem('backpackItems', JSON.stringify(updatedItems));
  };

  const handleHover = (item: Item | null) => {
    if (!isMobile) {
      setHoveredItem(item);
    }
  };

  const handleClick = (item: Item | null) => {
    if (isMobile) {
      setHoveredItem(prevItem => (prevItem === item ? null : item));
    }
  };

  const handleSellItem = (item: any) => {
    changeCoins(item.price);
    // Remove item from inventory
  };

  const isInTown = location.pathname.includes('/Blacksmith');

  return (
    <div className={styles.backpack}>
      {items.length === 0 ? (
        <p>Inventář je prázdný</p>
      ) : (
        items.map((item: Item) => (
          <div key={item.id} className={styles.backpackItem} onMouseEnter={() => handleHover(item)} onClick={() => handleClick(item)}>
            <div className={styles.imgContainer}>
              <img src={images[item.imageId]} alt={item.name} className={styles.img} />
            </div>
            {item.type === 'Miscellaneous' && <p>Quantity: {item.quantity}</p>}
            {hoveredItem === item && (
              <div className={styles.info}>
                <p>{item.name}</p>
                <p>Damage: {item.dmg}</p>
                <p>Rarity: {item.rarity}</p>
                <Button onClick={() => handleEquipItem(item)}>Equip</Button>
                {isInTown && <Button onClick={() => handleSellItem(item)}>Sell</Button>}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Backpack;