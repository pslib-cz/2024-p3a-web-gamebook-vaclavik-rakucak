import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './EquipmentSlot.module.css';

const EquipmentSlot: React.FC = () => {
  const [weapon, setWeapon] = useState<any>(null);
  const [shield, setShield] = useState<any>(null);
  const [armor, setArmor] = useState<any>(null);
  const [images, setImages] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const weaponResponse = await axios.get('https://localhost:7190/api/Equipments/1'); // ID 1 pro meč
        const armorResponse = await axios.get('https://localhost:7190/api/Equipments/7'); // ID 7 pro armor
        setWeapon(weaponResponse.data);
        setArmor(armorResponse.data);

        const imagePromises = [
          axios.get(`https://localhost:7190/api/Images/${weaponResponse.data.imageId}`, { responseType: 'blob' }),
          axios.get(`https://localhost:7190/api/Images/${armorResponse.data.imageId}`, { responseType: 'blob' })
        ];
        const imageResponses = await Promise.all(imagePromises);
        const imageMap: { [key: number]: string } = {};
        imageResponses.forEach((response, index) => {
          const url = URL.createObjectURL(response.data);
          imageMap[index === 0 ? weaponResponse.data.imageId : armorResponse.data.imageId] = url;
        });
        setImages(imageMap);
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <div className={styles.equipmentSlot}>
      <div className={styles.slot}>
        {weapon && (
          <>
            <img src={images[weapon.imageId]} alt={weapon.name} />
            <p>{weapon.name}</p>
            <p>Damage: {weapon.dmg}</p>
            <p>Rarity: {weapon.rarity}</p>
          </>
        )}
      </div>
      <div className={styles.slot}>
        {shield && (
          <>
            <img src={images[shield.imageId]} alt={shield.name} />
            <p>{shield.name}</p>
            <p>Damage: {shield.dmg}</p>
            <p>Rarity: {shield.rarity}</p>
          </>
        )}
      </div>
      <div className={styles.slot}>
        {armor && (
          <>
            <img src={images[armor.imageId]} alt={armor.name} />
            <p>{armor.name}</p>
            <p>Damage: {armor.dmg}</p>
            <p>Rarity: {armor.rarity}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default EquipmentSlot;