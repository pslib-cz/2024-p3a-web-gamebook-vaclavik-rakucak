import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '/AdminButton.module.css';


const AdminButton: React.FC = () => {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/login');
    };

    return (
        <button onClick={handleStart} className={styles.button}>
            Start Game
        </button>
    );
};

export default AdminButton;
