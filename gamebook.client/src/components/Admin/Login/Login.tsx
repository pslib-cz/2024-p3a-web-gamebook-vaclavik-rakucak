import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';


interface LoginProps {
    onLogin: (token: string, role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate(); // Initialize navigate

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
        const response = await fetch('https://localhost:7190/api/Auth/Login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data: { token: string; role: string } = await response.json();
            onLogin(data.token, data.role);
            navigate('/AdminPanel'); // Redirect to AdminPanel on successful login
        } else {
            setError('Špatné jméno nebo heslo');
        }
        } catch (e) {
        setError('Špatné jméno nebo heslo');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
            type="text"
            placeholder="Username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.button}>Login</button>
        </form>
    );
};

export default Login;