import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../SetNamePage/SetNamePage.module.css';

const NamePage: React.FC = () => {
    const [name, setName] = useState('');
    const [warning, setWarning] = useState('');
    const navigate = useNavigate();

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        if (input.length > 26) {
            setWarning('Nickname must be 26 characters or less.');
        } else {
            setWarning('');
        }
        setName(input);
    };

    // Navigate to /map when Enter key is pressed
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                navigateToMap();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, []);

    // Navigate to /map
    const navigateToMap = () => {
        if (name.trim() === '') {
            setWarning('Please enter a name before proceeding.');
        } else {
            navigate('/roomviewer');
        }
    };

    return (
        <div className={styles.namePage}>
            <h1 className={styles.title}>Dungeon'borne</h1>
            <div className={styles.inputContainer}>
                <label className={styles.label} htmlFor="nameInput">
                    Your name:
                </label>
                <input
                    id="nameInput"
                    type="text"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="Name example"
                    className={styles.inputField}
                    maxLength={40}
                />
            </div>
            {warning && <p className={styles.warning}>{warning}</p>}

            {/* "Enter" Button */}
            <button onClick={navigateToMap} className={styles.enterButton}>
                Enter
            </button>
        </div>
    );
};

export default NamePage;
