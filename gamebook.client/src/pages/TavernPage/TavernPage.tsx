import React, { useState, useEffect } from 'react';
import { fetchImage } from '../../api/imagesApi';
import styles from './TavernPage.module.css';
import RouteButton from '../../components/Buttons/routeButtons/routeButton.tsx';
import { Quest } from '../../types/ViewModels.ts';
import Button from '../../components/Buttons/ButtonLarge/ButtonLarge.tsx';
import { useGameContext } from '../../contexts/GameContext';
import QuestCard from '../../components/QuestCard/QuestCard.tsx';

const TavernPage: React.FC = () => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
  const [availableQuests, setAvailableQuests] = useState<Quest[]>([]);
  const { currentQuests, acceptQuest, completeQuest } = useGameContext();

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

  useEffect(() => {
    const fetchAvailableQuests = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/quests`);
        if (!response.ok) {
          throw new Error('Failed to fetch quests');
        }
        const quests: Quest[] = await response.json();
        // Set only the first quest as available initially
        setAvailableQuests(quests.filter((quest) => quest.id === 1));
      } catch (error) {
        console.error('Error fetching quests:', error);
      }
    };

    fetchAvailableQuests();
  }, []);

  const handleAcceptQuest = (quest: Quest) => {
    acceptQuest(quest);
  };

  const handleCompleteQuest = (questId: number) => {
    completeQuest(questId);
    // Fetch the next quest in the sequence
    const nextQuestIndex = availableQuests.findIndex((q) => q.id === questId) + 1;
    if (nextQuestIndex < availableQuests.length) {
      setAvailableQuests([availableQuests[nextQuestIndex]]);
    }
  };

  const activeQuest = currentQuests.length > 0 ? currentQuests[0] : null;

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
      {activeQuest ? (
        <div className={styles.activeQuest}>
          <QuestCard quest={activeQuest}  />
          <div className={styles.completeButton}>
            {activeQuest.progress >= activeQuest.conditionValue && (
              <Button onClick={() => handleCompleteQuest(activeQuest.id)}>Complete Quest</Button>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.questList}>
          <h2>Available Quests:</h2>
          {availableQuests.map((quest) => (
            <div key={quest.id} className={styles.quest}>
              <h3>{quest.name}</h3>
              <p>{quest.description}</p>
              <Button onClick={() => handleAcceptQuest(quest)}>Accept Quest</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TavernPage;