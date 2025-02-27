import React, { useEffect, useState } from 'react';
import Prologue from '../../components/Prologue/Prologue';
import { fetchImage } from '../../api/imagesApi';
import { fetchTown } from '../../api/townsApi';

const TextPage: React.FC = () => {
  const townId = 1; // ID of the town to fetch
  const [prologueText, setPrologueText] = useState<string>('Vítejte v naší hře! Toto je váš prolog...');
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const loadTownData = async () => {
      try {
        const town = await fetchTown(townId);
        setPrologueText(town.text);
        const url = await fetchImage(town.imageId);
        setImageUrl(url);
      } catch (error) {
        console.error('Error loading town data:', error);
      }
    };

    loadTownData();
  }, [townId]);

  return (
    <div>
      <Prologue prologueText={prologueText} imageUrl={imageUrl} />
      {/* Další obsah stránky */}
    </div>
  );
};

export default TextPage;