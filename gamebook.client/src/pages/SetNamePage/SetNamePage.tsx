import React, { useState } from 'react';
import styles from '../SetNamePage/SetNamePage.module.css';

const NamePage: React.FC = () => {
    const [name, setName] = useState('');
    const [warning, setWarning] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        if (input.length > 26) {
            setWarning('Nickname must be 26 characters or less.');
        } else {
            setWarning('');
        }
        setName(input);
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
                    maxLength={40} /* Prevent absurdly long input */
                />
            </div>
            {warning && <p className={styles.warning}>{warning}</p>}
        </div>
    );
};

export default NamePage;
