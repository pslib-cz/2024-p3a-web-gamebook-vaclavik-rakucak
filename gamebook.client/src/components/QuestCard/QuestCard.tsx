import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './QuestCard.module.css';
import { fetchImage } from '../../api/imagesApi';
import { Quest } from '../../types/ViewModels';

type Npc = {
  id: number;
  name: string;
  description: string;
};


type NpcQuestCardProps = {
  quest: Quest;
};

const NpcQuestCard: React.FC<NpcQuestCardProps> = ({ quest }) => {
  const baseApiUrl = '/api';
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
          const response = await axios.get(npcUrl);
          const npcJson = response.data;
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
    const fetchImageForQuest = async () => {
      if (quest.imageId) {
        try {
          const imageUrl = await fetchImage(quest.imageId);
          setImageBlobUrl(imageUrl);
        } catch (err) {
          console.error('Error fetching image:', err);
          setImageBlobUrl(null);
        }
      } else {
        setImageBlobUrl(null);
      }
    };
    fetchImageForQuest();
  }, [quest.imageId]);

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