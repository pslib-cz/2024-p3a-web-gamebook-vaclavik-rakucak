import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../StartButton/StartButton.module.css';

const StartButton: React.FC = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/room');
    };

    return (
        <button onClick={handleStart} className={styles.button}>
            Start Game
        </button>
    );
};

export default StartButton;
