import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Prologue from '../../components/Prologue/Prologue';
import { fetchImage } from '../../api/imagesApi';
import { fetchTown } from '../../api/townsApi';

const TextPage: React.FC = () => {
  const { townId } = useParams<{ townId?: string }>();
  const [prologueText, setPrologueText] = useState<string>('Vítejte v naší hře! Toto je váš prolog...');
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const loadTownData = async () => {
      try {
        if (!townId) {
          throw new Error('Town ID is missing.');
        }
        const town = await fetchTown(parseInt(townId));
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
    </div>
  );
};

export default TextPage;