import React, { useState, useEffect } from 'react';
import RouteButton from '../../components/Buttons/routeButtons/routeButton.tsx';
import axios from 'axios';
import { useGameContext } from '../../contexts/GameContext';
import Button from '../../components/Buttons/ButtonSmall/ButtonSmall';
import styles from './ShopPage.module.css';
import Burgir from '../../components/Burgir/Burgir';
import PauseMenu from '../../components/PauseMenu/PauseMenu.tsx';
import ImageWithBackground from '../../components/ImageWithBackground/ImageWithBackground';
import Modal from '../../components/Modal/Modal';
import { fetchImage } from '../../api/imagesApi';

const ShopPage: React.FC = () => {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [images, setImages] = useState<{ [key: number]: string }>({});
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const { coins, changeCoins, items, setItems, completedQuests } = useGameContext();
  const [isPauseMenuOpen, setIsPauseMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const togglePauseMenu = () => {
    setIsPauseMenuOpen((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const baseApiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEquipment = async () => {
      const phase = Math.floor(completedQuests.length / 3) + 1;
      try {
        const response = await axios.get(`${baseApiUrl}/ShopOffer/random`, {
          params: { phase }
        });
        if (response.headers['content-type']?.includes('application/json')) {
          if (Array.isArray(response.data)) {
            setEquipment(response.data);
            sessionStorage.setItem('shopEquipment', JSON.stringify(response.data));
          } else {
            console.error('Unexpected response data:', response.data);
          }
        } else {
          console.error('Unexpected response format:', response);
        }
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };

    const fetchImages = async () => {
      const storedEquipment = sessionStorage.getItem('shopEquipment');
      if (storedEquipment) {
        const equipment = JSON.parse(storedEquipment);
        if (Array.isArray(equipment)) {
          const imagePromises = equipment.map((item: any) => fetchImage(item.imageId));
          const imageUrls = await Promise.all(imagePromises);
          const imageMap: { [key: number]: string } = {};
          imageUrls.forEach((url, index) => {
            imageMap[equipment[index].imageId] = url;
          });
          setImages(imageMap);
        } else {
          console.error('Stored equipment is not an array:', equipment);
        }
      }
    };

    const fetchBackgroundImage = async () => {
      try {
        const url = await fetchImage(27);
        setBackgroundImage(url);
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchEquipment().then(fetchImages);
    fetchBackgroundImage();
  }, [completedQuests]);

  const handleBuyItem = (item: any) => {
    if (coins >= item.price) {
      changeCoins(-item.price);

      let updatedItems = [...items];
      if (item.type === 'Miscellaneous') {
        const existingItemIndex = updatedItems.findIndex(
          (invItem) => invItem.id === item.id
        );

        if (existingItemIndex !== -1) {
          updatedItems[existingItemIndex].quantity =
            (updatedItems[existingItemIndex].quantity || 1) + 1;
        } else {
          item.quantity = 1;
          updatedItems.push(item);
        }
      } else {
        updatedItems.push(item);
      }

      setItems(updatedItems);
      sessionStorage.setItem('backpackItems', JSON.stringify(updatedItems));
      console.log('Item added to backpack:', item);
      if (item.type !== 'Miscellaneous') {
        const updatedEquipment = equipment.map((equipItem) =>
          equipItem.id === item.id ? { ...equipItem, bought: true } : equipItem
        );
        setEquipment(updatedEquipment);
        sessionStorage.setItem('shopEquipment', JSON.stringify(updatedEquipment));
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const sectionTitles = ["Weapons", "Shields", "Armors", "Miscellaneous"];

  const renderSection = (sectionItems: any[], sectionIndex: number) => {
    return (
      <div key={sectionIndex} className={styles.sectionContainer}>
        <h2 className={styles.containerHeading}>{sectionTitles[sectionIndex % sectionTitles.length]}</h2>
        <div className={styles.shopContainer}>
          {sectionItems.map((item) => (
            <div key={item.id} className={`${styles.itemContainer} ${item.bought ? styles.hidden : ''}`}>
              <ImageWithBackground
                imageUrl={images[item.imageId]}
                rarity={item.rarity}
                altText={item.name}
              />
              <div className={styles.itemInfo}>
                <h3>{item.name}</h3>
                <div className={styles.itemStats}>
                  <p>Price: {item.price}</p>
                  {sectionIndex % 3 === 0 && <p>Damage: {item.dmg}</p>}
                  {sectionIndex % 3 === 1 && <p>Defense: {item.dmg}%</p>}
                  {sectionIndex % 3 === 2 && <p>Defense: {item.dmg}</p>}
                </div>
              </div>
              <Button onClick={() => handleBuyItem(item)}>Buy</Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const sections = [];
  for (let i = 0; i < equipment.length; i += 3) {
    sections.push(equipment.slice(i, i + 3));
  }

  return (
    <div className={styles.shopPage} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div style={{ position: 'absolute', top: '0', right: '0', zIndex: 100 }}>
        <Burgir onClick={togglePauseMenu} isOpen={isPauseMenuOpen} />
      </div>
      {isPauseMenuOpen && <PauseMenu onClose={togglePauseMenu} currentPage='Shop' />}
      <div className={styles.backButton}>
        <RouteButton route="/Town" label="Back" />
      </div>
      <div className={styles.content}>
        {sections.map((sectionItems, index) => renderSection(sectionItems, index))}
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          Not enough coins to buy this item!
        </Modal>
      )}
    </div>
  );
};

export default ShopPage;