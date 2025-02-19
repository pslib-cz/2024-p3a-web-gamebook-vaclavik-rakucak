import React, { useState, useEffect } from 'react';
import styles from './QuestCard.module.css';

type Npc = {
  id: number;
  name: string;
  description: string;
};

type Quest = {
  id: number;
  name: string;
  description: string;
  condition: string;
  conditionValue: number;
  progress: number;
  npcId: number;
  rewardItemId: number | null;
  rewardItem: any | null;
  imageId: number;
  conditionDescription: string;
};

type NpcQuestCardProps = {
  quest: Quest;
};

const NpcQuestCard: React.FC<NpcQuestCardProps> = ({ quest }) => {
  const baseApiUrl = import.meta.env.VITE_API_URL;
  const [npcData, setNpcData] = useState<Npc | null>(null);
  const [npcLoading, setNpcLoading] = useState<boolean>(false);
  const [npcError, setNpcError] = useState<string | null>(null);
  const [imageBlobUrl, setImageBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchNpc = async () => {
      if (quest.npcId) {
        setNpcLoading(true);
        setNpcError(null);
        try {
          const npcUrl = `${baseApiUrl}/npcs/${quest.npcId}`;
          const response = await fetch(npcUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const npcJson = await response.json();
          setNpcData(npcJson);
        } catch (err) {
          setNpcError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setNpcLoading(false);
        }
      } else {
        setNpcData(null);
      }
    };
    fetchNpc();
  }, [quest.npcId, baseApiUrl]);

  useEffect(() => {
    const fetchImage = async () => {
      if (quest.imageId) {
        try {
          const imageUrl = `${baseApiUrl}/images/${quest.imageId}`;
          const response = await fetch(imageUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageBlobUrl(url);
        } catch (err) {
          console.error('Error fetching image:', err);
          setImageBlobUrl(null);
        }
      } else {
        setImageBlobUrl(null);
      }
    };
    fetchImage();
  }, [quest.imageId, baseApiUrl]);

  if (npcLoading) {
    return <div>Loading...</div>;
  }

  if (npcError) {
    return <div>Error: {npcError}</div>;
  }

  if (!npcData) {
    return <div>No data available.</div>;
  }

  return (
    <div className={styles.card}>
      <div className={styles.npcInfo}>
        <h2 className={styles.npcName}>{npcData.name}</h2>
        <p className={styles.npcDescription}>{npcData.description}</p>
      </div>
      <div className={styles.questInfo}>
        <div className={styles.questText}>
          <h3 className={styles.questName}>{quest.name}</h3>
          <p className={styles.questDescription}>{quest.description}</p>
        </div>
        <p className={styles.questCondition}>
          {quest.conditionDescription} {quest.progress}/{quest.conditionValue}
        </p>
      </div>
      {imageBlobUrl && (
        <div className={styles.imageContainer}>
          <img src={imageBlobUrl} alt="Quest" className={styles.questImage} />
        </div>
      )}
    </div>
  );
};

export default NpcQuestCard;