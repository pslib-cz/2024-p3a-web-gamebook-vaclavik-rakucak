import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Prologue.module.css';

interface PrologueProps {
  prologueText: string;
  imageUrl: string;
}

const Prologue: React.FC<PrologueProps> = ({ prologueText, imageUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Map');
  };

  return (
    <div className={styles.prologueContainer} onClick={handleClick}>
      <div className={styles.prologueBackground} style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className={styles.fadeOverlay}></div>
      <div className={styles.prologueText}>{prologueText}</div>
      <div className={styles.clickToContinue}>Click to continue</div>
    </div>
  );
};

export default Prologue;