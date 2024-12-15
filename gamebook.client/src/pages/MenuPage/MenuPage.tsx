import React from 'react';
import StartButton from '../../components/StartButton';
import styles from './MenuPage.module.css';

const MenuPage: React.FC = () => {
    return (
        <div className={styles.menuPage}>
            <h1 className={styles.title}>Dungeonborne</h1>
            <div className={styles.buttonContainer}>
                <StartButton />
            </div>
        </div>
    );
};

export default MenuPage;
