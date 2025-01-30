import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Backpack.module.css';
import { useGameContext } from '../../contexts/GameContext';
import Button from '../Buttons/ButtonSmall/ButtonSmall';

const Backpack: React.FC = () => {
  const [images, setImages] = useState<{ [key: number]: string }>({});
  const { items, setItems, setWeapon, setShield, setArmor } = useGameContext();

  useEffect(() => {
    const fetchImages = async () => {
      const storedItems = sessionStorage.getItem('backpackItems');
      if (storedItems) {
        const items = JSON.parse(storedItems);
        if (Array.isArray(items)) {
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
        } else {
          console.error('Stored items are not an array:', items);
        }
      }
    };

    fetchImages();
  }, [items]);

  const handleEquipItem = (item: any) => {
    if (item.type === 'Weapon') setWeapon(item);
    if (item.type === 'Shield') setShield(item);
    if (item.type === 'Armor') setArmor(item);
    removeItem(item.id);
  };

  const removeItem = (itemId: number) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      sessionStorage.setItem('backpackItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (
    <div className={styles.backpack}>
      {items.length === 0 ? (
        <p>Inventář je prázdný</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className={styles.backpackItem}>
            <img src={images[item.imageId]} alt={item.name} />
            <p>{item.name}</p>
            <p>Damage: {item.dmg}</p>
            <p>Rarity: {item.rarity}</p>
            {item.type === 'Miscellaneous' && <p>Quantity: {item.quantity}</p>}
            <Button onClick={() => handleEquipItem(item)}>Equip</Button>
          </div>
        ))
      )}
    </div>
  );
};

export default Backpack;