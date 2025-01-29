import React, { useState, useEffect } from 'react';
import RouteButton from '../../components/Buttons/routeButtons/routeButton.tsx';
import axios from 'axios';

const ShopPage: React.FC = () => {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [images, setImages] = useState<{ [key: number]: string }>({});
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      const storedEquipment = sessionStorage.getItem('shopEquipment');
      if (storedEquipment) {
        const parsedEquipment = JSON.parse(storedEquipment);
        if (Array.isArray(parsedEquipment)) {
          setEquipment(parsedEquipment);
        } else {
          console.error('Stored equipment is not an array:', parsedEquipment);
        }
      } else {
        try {
          const response = await axios.get('https://localhost:7190/api/ShopOffer/random');
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
      }
    };

    const fetchImages = async () => {
      const storedEquipment = sessionStorage.getItem('shopEquipment');
      if (storedEquipment) {
        const equipment = JSON.parse(storedEquipment);
        if (Array.isArray(equipment)) {
          const imagePromises = equipment.map((item: any) =>
            axios.get(`https://localhost:7190/api/Images/${item.imageId}`, { responseType: 'blob' })
          );
          const imageResponses = await Promise.all(imagePromises);
          const imageMap: { [key: number]: string } = {};
          imageResponses.forEach((response, index) => {
            const url = URL.createObjectURL(response.data);
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
        const response = await axios.get('https://localhost:7190/api/Images/26', { responseType: 'blob' });
        const url = URL.createObjectURL(response.data);
        setBackgroundImage(url);
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchEquipment().then(fetchImages);
    fetchBackgroundImage();
  }, []);

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <RouteButton route="/Town" label="Zpět do města" />
      <div className="shop-items">
        {Array.isArray(equipment) && equipment.map((item) => (
          <div key={item.id} className="shop-item">
            <img src={images[item.imageId]} alt={item.name} />
            <h3>{item.name}</h3>
            <p>Type: {item.type}</p>
            <p>Price: {item.price}</p>
            <p>Rarity: {item.rarity}</p>
            <p>Damage: {item.dmg}</p>
            {item.specialEffect && (
              <p>Special Effect: {item.specialEffect.name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;