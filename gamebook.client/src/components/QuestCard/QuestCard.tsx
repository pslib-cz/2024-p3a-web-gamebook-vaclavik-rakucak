import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import styles from './QuestCard.module.css';

type Npc = {
    id: number;
    name: string;
    description: string;
}

type Quest = {
    id: number;
    name: string;
    description: string;
    condition: string;
    conditionValue: number;
    npcId: number;
    rewardItemId: number | null;
    rewardItem: any | null;
    imageId: number;
}

type NpcQuestCardProps = {
    questId: number;
}

const NpcQuestCard: React.FC<NpcQuestCardProps> = ({ questId }) => {
    const baseApiUrl = import.meta.env.VITE_API_URL;
    const questUrl = `${baseApiUrl}/quests/${questId}`;

    const { data: questData, loading: questLoading, error: questError } = useFetch<Quest>(questUrl);
    const [npcData, setNpcData] = useState<Npc | null>(null);
    const [npcLoading, setNpcLoading] = useState<boolean>(false);
    const [npcError, setNpcError] = useState<string | null>(null);
    const [imageBlobUrl, setImageBlobUrl] = useState<string | null>(null);

     useEffect(() => {
        const fetchNpc = async () => {
           if(questData?.npcId){
            setNpcLoading(true);
            setNpcError(null);
            try {
                const npcUrl = `${baseApiUrl}/npcs/${questData.npcId}`;
                const response = await fetch(npcUrl);
                if (!response.ok) {
                     throw new Error(`HTTP error! status: ${response.status}`);
                }
                const npcJson = await response.json();
                setNpcData(npcJson);
            }
            catch (err) {
                setNpcError(err instanceof Error ? err.message : 'Unknown error');
              }
             finally{
                setNpcLoading(false);
             }
           } else {
               setNpcData(null)
           }
        };
        fetchNpc();
      }, [questData?.npcId, baseApiUrl]);

   useEffect(() => {
    const fetchImage = async () => {
           if (questData?.imageId) {
            try {
              const imageUrl = `${baseApiUrl}/images/${questData.imageId}`;
              const response = await fetch(imageUrl);
                   if (!response.ok) {
                         throw new Error(`HTTP error! status: ${response.status}`);
                   }
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    setImageBlobUrl(url);
                }
             catch (err) {
                  console.error('Error fetching image:', err);
                  setImageBlobUrl(null);
              }
          } else {
            setImageBlobUrl(null);
          }
       };
      fetchImage();
  }, [questData?.imageId, baseApiUrl]);



    if (npcLoading || questLoading) {
        return <div>Loading...</div>;
    }

    if (npcError || questError) {
        return <div>Error: {npcError || questError}</div>;
    }

    if (!npcData || !questData) {
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
                    <h3 className={styles.questName}>{questData.name}</h3>
                    <p className={styles.questDescription}>{questData.description}</p>
                </div>
                <p className={styles.questCondition}>{questData.condition} 0/{questData.conditionValue}</p>
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