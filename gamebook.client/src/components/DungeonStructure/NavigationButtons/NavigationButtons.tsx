import React from 'react';
import styles from './RoomViewer.module.css';
import Button from '../../Buttons/ButtonLarge/ButtonLarge';

interface NavigationButtonsProps {
  currentChainIndex: number;
  chainLength: number;
  isRoomDeadEnd: boolean | undefined;
  isFork: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentChainIndex,
  chainLength,
  isRoomDeadEnd,
  isFork,
  onPrevious,
  onNext,
}) => {
  const isFirstItem = currentChainIndex === 0;
  const isLastItem = currentChainIndex === chainLength - 1;

  return (
    <div className={styles.navigationButtons}>
      <Button
        onClick={onPrevious}
        disabled={isFirstItem}
      >
        Previous
      </Button>
      <Button
        onClick={onNext}
        disabled={isLastItem || isRoomDeadEnd || isFork}
      >
        Next
      </Button>
    </div>
  );
};

export default NavigationButtons;