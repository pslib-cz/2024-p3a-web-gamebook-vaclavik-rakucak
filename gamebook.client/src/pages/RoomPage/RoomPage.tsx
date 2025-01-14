import React, { useEffect } from 'react';
import RoomViewer from '../../components/RoomViewer/RoomViewer';
import { useGameContext } from '../../contexts/GameContext';
import useFetch from '../../hooks/useFetch';
import { ChainItemDto } from '../../types/RoomDto';
import styles from './RoomPage.module.css';
import { useParams } from 'react-router-dom';

const RoomPage: React.FC = () => {
  const { setChain, setCurrentChainIndex } = useGameContext();
  const { roomId } = useParams<{ roomId: string }>(); // Použijeme useParams pro získání roomId z URL
  const dungeonId = roomId ? parseInt(roomId, 10) : 2; // Získání dungeonId a default hodnota


  const { data: chainData, loading, error } = useFetch<ChainItemDto[]>(`https://localhost:7190/DungeonChain/${dungeonId}`);

  useEffect(() => {
    if (chainData) {
      setChain(chainData);
      setCurrentChainIndex(0);
    }
  }, [chainData, setChain, setCurrentChainIndex]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <RoomViewer />
    </div>
  );
};

export default RoomPage;