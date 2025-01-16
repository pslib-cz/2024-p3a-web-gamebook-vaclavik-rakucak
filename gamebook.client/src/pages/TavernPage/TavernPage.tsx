import React, { useState, useEffect } from 'react';
import { fetchImage } from '../../api/imagesApi';
import styles from './TavernPage.module.css';
import RouteButton from '../../components/Buttons/routeButtons/routeButton.tsx';
import Quest from '../../components/QuestCard/QuestCard.tsx';
import Button from '../../components/Buttons/ButtonLarge/ButtonLarge.tsx';

const TavernPage: React.FC = () => {
    const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
    const [questId, setQuestId] = useState<number>(1); // Startovací quest id

    useEffect(() => {
        const loadImage = async () => {
            try {
                const imageId = 26;
                const url = await fetchImage(imageId);
                setBackgroundImageUrl(url);
            } catch (error) {
                console.error('Error loading background image:', error);
            }
        };

        loadImage();
    }, []);

   const handleNextQuest = () => {
        setQuestId((prevId) => prevId + 1);
   };

   const handlePreviousQuest = () => {
       setQuestId((prevId) => (prevId > 1 ? prevId - 1 : 1));
   };


    return (
        <div className={styles.tavernPage}
            style={{ backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className={styles.back}><RouteButton route="/Town" label="Back" /></div>
            <Quest baseApiUrl='https://localhost:7190/api' questId={questId} />
            <div style={{ display: "flex", justifyContent: "center", position: "absolute", bottom: "10px", width: "100%" }}>
              <Button onClick={handlePreviousQuest}>Previous quest</Button>
              <Button onClick={handleNextQuest}>Next quest</Button>
            </div>

        </div>
    );
};

export default TavernPage;