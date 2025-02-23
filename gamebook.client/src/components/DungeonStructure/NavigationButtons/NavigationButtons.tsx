import React from 'react';
import styles from './NavigationButtons.module.css';
import Button from '../../Buttons/ButtonLarge/ButtonLarge';

type NavigationButtonsProps = {
  currentChainIndex: number;
  chainLength: number;
  isRoomDeadEnd: boolean | undefined;
  isFork: boolean;
  onPrevious: () => void;
  onNext: () => void;
  isFighting: boolean;
  isActive: boolean;
  isRoomActive: boolean;
  isFightBoss: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentChainIndex,
  chainLength,
  isRoomDeadEnd,
  isFork,
  onPrevious,
  onNext,
  isFighting,
  isActive,
  isRoomActive,
  isFightBoss,
}) => {
  const isFirstItem = currentChainIndex === 0;
  const isLastItem = currentChainIndex === chainLength - 1;

  return (
    <div className={styles.nvBtnContainer}>
      <Button
        onClick={onPrevious}
        disabled={isFirstItem || isFighting || isRoomActive || isActive || isFightBoss}
      >
        Go back
      </Button>
      <Button
        onClick={onNext}
        disabled={isLastItem || isRoomDeadEnd || isFork || isFighting || isActive || isRoomActive || isFightBoss}
      >
        Go further
      </Button>
    </div>
  );
};

export default NavigationButtons;