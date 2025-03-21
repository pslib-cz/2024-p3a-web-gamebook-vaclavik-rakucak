import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

interface LoginProps {
    onLogin: (token: string, role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/Auth/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data: { token: string; role: string } = await response.json();
                onLogin(data.token, data.role);
                navigate('/AdminPanel');
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
            <button type="button" className={styles.button} onClick={() => navigate(-1)}>Back</button>
        </form>
    );
};

export default Login;