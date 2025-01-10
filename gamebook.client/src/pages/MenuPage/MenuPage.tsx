import React from 'react';
import Button from '../../components/Button/Button';
import styles from './MenuPage.module.css';

const MenuPage: React.FC = () => {
    return (
        <div className={styles.menuPage}>
            <h1 className={styles.title}>Dungeon'borne</h1>
            <div className={styles.buttonContainer}>
                <Button route='/login' label='Admin Login' />
                <Button route='/Room' label='Start Game'/>
            </div>
        </div>
    );
};

export default MenuPage;
