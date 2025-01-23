import React, { useEffect, useState } from 'react';
import { useGameContext } from '../../../contexts/GameContext';
import { RoomDto, HallDto, ForkDto } from '../../../types/RoomDto';
import styles from './RoomViewer.module.css';
import useFetch from '../../../hooks/useFetch';
import RoomContent from '../RoomContent/RoomContent';
import HallContent from '../HallContent/HallContent';
import ForkContent from '../ForkContent/ForkContent';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import { useNavigate } from 'react-router-dom';
import Button from '../../Buttons/ButtonLarge/ButtonLarge.tsx';

type Monster = {
  id: number;
  name: string;
  hitpoints: number;
  damage: number;
  imageId: number;
};

const RoomViewer: React.FC = () => {
  const { playerHealth, maxPlayerHealth, defeatedMonsters, setDefeatedMonsters } = useGameContext();
  const { chain, currentChainIndex, setCurrentChainIndex, dungeonId } = useGameContext();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string>('');
  const [monster, setMonster] = useState<Monster | null>(null);
  const [isFighting, setIsFighting] = useState<boolean>(false);
  const currentItem = chain ? chain[currentChainIndex] : null;
  const {
    data: fetchedMonster,
    error: monsterError,
    loading: monsterLoading,
  } = useFetch<Monster>(
    currentItem && currentItem.type === 'room' && currentItem.data.type === 'monster' && monster ? `https://localhost:7190/api/monsters/${monster.id}` : null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const currentItem = chain ? chain[currentChainIndex] : null;
    if (currentItem && currentItem.type === 'room' && currentItem.data.type === 'monster' && fetchedMonster) {
      setMonster(fetchedMonster);
    } else if (currentItem && currentItem.type === 'room' && currentItem.data.type !== 'monster') {
      setMonster(null);
    }
  }, [fetchedMonster, currentChainIndex, chain]);

  useEffect(() => {
    const currentItem = chain ? chain[currentChainIndex] : null;
    if (
      currentItem &&
      (currentItem.type === 'hall' || currentItem.type === 'room') &&
      currentItem.data.imageId
    ) {
      setBackgroundImageUrl(
        `https://localhost:7190/api/images/${currentItem.data.imageId}`
      );
    } else {
      setBackgroundImageUrl('');
    }
  }, [chain, currentChainIndex]);

  const handleNext = () => {
    if (!chain) return;

    if (currentChainIndex < chain.length - 1) {
      const nextIndex = currentChainIndex + 1;
      setCurrentChainIndex(nextIndex);
      setIsFighting(false);
      setMonster(null);
    }
  };

  const handlePrevious = () => {
    if (currentChainIndex > 0) {
      const prevIndex = currentChainIndex - 1;
      setCurrentChainIndex(prevIndex);
      setIsFighting(false);
      setMonster(null);
    }
  };

  const getRandomMonsterId = () => {
    const min = 1;
    const max = 5;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleFightStart = () => {
    const currentItem = chain ? chain[currentChainIndex] : null;
    if (currentItem && currentItem.type === 'room' && currentItem.data.type === 'monster') {
      setIsFighting(true);
      setMonster({ id: getRandomMonsterId() } as Monster);
    }
  };

    const handleFightEnd = (monsterId?: number) => {
    setIsFighting(false);
    setMonster(null);
    if (monsterId) {
      setDefeatedMonsters((prev) => [...prev, monsterId]);
    }
  };

  const handleGoBackToMap = () => {
    if (!dungeonId) return;

    const storageKey = `chain_${dungeonId}`;
    const defeatedMonstersKey = `defeatedMonsters_${dungeonId}`;
    localStorage.removeItem(storageKey);
    localStorage.removeItem(defeatedMonstersKey);
    navigate('/map');
  };

  if (!chain || chain.length === 0) {
    return <div className={styles.ViewContainer}>No chain data available.</div>;
  }

  if (!currentItem) {
    return <div className={styles.ViewContainer}>Aktuální pozice nenalezena</div>;
  }

  const isRoomDto = (data: any): data is { type: "room"; data: RoomDto } => {
    return data && data.type === 'room' && data.data;
  }
  const isHallDto = (data: any): data is { type: "hall"; data: HallDto } =>{
    return data && data.type === 'hall' && data.data;
  }
  const isForkDto = (data: any): data is { type: "fork"; data: ForkDto } => {
    return data && data.type === 'fork' && data.data;
  }

  const isLastRoom = currentChainIndex === chain.length -1;

  return (
    <div className={styles.ViewContainer}>
      {backgroundImageUrl && (
        <div
          className={styles.hallBackground}
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}

      {isRoomDto(currentItem) && (
        <RoomContent
          room={currentItem.data}
          isFighting={isFighting}
          monster={monster}
          monsterLoading={monsterLoading}
          monsterError={monsterError}
          handleFightStart={handleFightStart}
          handleFightEnd={handleFightEnd}
        />
      )}
      {isHallDto(currentItem) && <HallContent hall={currentItem.data} />}
      {isForkDto(currentItem) && <ForkContent fork={currentItem.data} />}

      <NavigationButtons
        currentChainIndex={currentChainIndex}
        chainLength={chain.length}
        isRoomDeadEnd={currentItem.type === 'room' && currentItem.data.isDeadEnd}
        isFork={currentItem.type === 'fork'}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
      <div className={styles.playerHealth}>
        Health: {playerHealth} / {maxPlayerHealth}
      </div>
      {isLastRoom && (
        <div className={styles.goBackButton}>
          <Button onClick={handleGoBackToMap}>Exit Dungeon</Button>
        </div>
      )}
    </div>
  );
};

export default RoomViewer;