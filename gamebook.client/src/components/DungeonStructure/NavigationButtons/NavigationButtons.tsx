import React from 'react';
import styles from './NavigationButtons.module.css';
import Button from '../../Buttons/ButtonLarge/ButtonLarge';

interface NavigationButtonsProps {
  currentChainIndex: number;
  chainLength: number;
  isRoomDeadEnd: boolean | undefined;
  isFork: boolean;
  onPrevious: () => void;
  onNext: () => void;
  isFighting: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentChainIndex,
  chainLength,
  isRoomDeadEnd,
  isFork,
  onPrevious,
  onNext,
  isFighting,
}) => {
  const isFirstItem = currentChainIndex === 0;
  const isLastItem = currentChainIndex === chainLength - 1;

  return (
    <div className={styles.nvBtnContainer}>
      <Button
        onClick={onPrevious}
        disabled={isFirstItem || isFighting}
      >
        Go back
      </Button>
      <Button
        onClick={onNext}
        disabled={isLastItem || isRoomDeadEnd || isFork || isFighting}
      >
        Go further
      </Button>
    </div>
  );
};

export default NavigationButtons;