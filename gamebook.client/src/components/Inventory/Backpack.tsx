import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Backpack.module.css';

const Backpack: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [images, setImages] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchItems = async () => {
      const storedItems = sessionStorage.getItem('backpackItems');
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        if (Array.isArray(parsedItems)) {
          setItems(parsedItems);
        } else {
          console.error('Stored items are not an array:', parsedItems);
        }
      }
    };

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

    fetchItems().then(fetchImages);
  }, []);

  const addItem = (newItem: any) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      if (existingItem && newItem.type === 'Miscellaneous') {
        const updatedItems = prevItems.map(item =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
        sessionStorage.setItem('backpackItems', JSON.stringify(updatedItems));
        return updatedItems;
      }
      const updatedItems = [...prevItems, newItem];
      sessionStorage.setItem('backpackItems', JSON.stringify(updatedItems));
      return updatedItems;
    });
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
          </div>
        ))
      )}
    </div>
  );
};

export default Backpack;