import React, { useState, useEffect } from 'react';
import { fetchImage } from '../../api/imagesApi';
import styles from './TavernPage.module.css';
import RouteButton from '../../components/Buttons/routeButtons/routeButton.tsx';
import Quest from '../../components/QuestCard/QuestCard.tsx';
import Button from '../../components/Buttons/ButtonLarge/ButtonLarge.tsx';
import Burgir from '../../components/Burgir/Burgir.tsx';
import PauseMenu from '../../components/PauseMenu/PauseMenu.tsx';
import { useGameContext } from '../../contexts/GameContext';

const TavernPage: React.FC = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
  const [questId, setQuestId] = useState<number>(1); // Startovací quest id
  const [isPauseMenuOpen, setIsPauseMenuOpen] = useState<boolean>(false);
  const { currentQuests, updateQuestProgress, completeQuest, fetchQuests } = useGameContext();

  const togglePauseMenu = () => {
    setIsPauseMenuOpen((prev) => !prev);
  };

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

  const handleCompleteQuest = (questId: number) => {
    completeQuest(questId);
  };

  const handleAcceptQuests = () => {
    fetchQuests();
  };

  return (
    <div
      className={styles.tavernPage}
      style={{
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className={styles.back}>
        <RouteButton route="/Town" label="Back" />
      </div>
      <div style={{ position: 'absolute', top: '0', right: '0', zIndex: 100 }}>
        <Burgir onClick={togglePauseMenu} isOpen={isPauseMenuOpen} />
      </div>
      {isPauseMenuOpen && <PauseMenu onClose={togglePauseMenu} currentPage="Tavern" />}
      <Quest questId={questId} />
      <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', bottom: '10px', width: '100%' }}>
        <Button onClick={handlePreviousQuest}>Previous quest</Button>
        <Button onClick={handleNextQuest}>Next quest</Button>
      </div>
      <div className={styles.questList}>
        {currentQuests.map((quest) => (
          <div key={quest.id} className={styles.quest}>
            <h3>{quest.name}</h3>
            <p>{quest.description}</p>
            <p>Progress: {quest.progress}/{quest.conditionValue}</p>
            {quest.progress >= quest.conditionValue && (
              <Button onClick={() => handleCompleteQuest(quest.id)}>Complete Quest</Button>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button onClick={handleAcceptQuests}>Accept Quests</Button>
      </div>
    </div>
  );
};

export default TavernPage;