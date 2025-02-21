import React from 'react';
import { useGameContext } from '../../contexts/GameContext';
import { RoomItem } from '../../types/ViewModels';

interface RoomItemComponentProps {
  roomItem: RoomItem;
  onLeaveRoom: () => void;
}

const RoomItemComponent: React.FC<RoomItemComponentProps> = ({ roomItem, onLeaveRoom }) => {
  const { currentQuests, updateQuestProgress } = useGameContext();

  const activeQuest = currentQuests.find(quest => quest.roomItemId === roomItem.id);

  const handleLookAround = () => {
    if (activeQuest) {
      updateQuestProgress(activeQuest.id, activeQuest.progress + 1);
    }
  };

  return (
    <div>
      <h2>{roomItem.name}</h2>
      <p>{roomItem.description}</p>
      {activeQuest && (
        <button onClick={handleLookAround}>Look Around</button>
      )}
      <button onClick={onLeaveRoom}>Leave Room</button>
    </div>
  );
};

export default RoomItemComponent;