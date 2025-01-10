import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Button.module.css';

type ButtonProps = {
    route: string;
    label: string;
}

const Button: React.FC<ButtonProps> = ({route, label}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route);
    };

    return (
        <button onClick={handleClick} className={styles.button}>
            {label}
        </button>
    );
};

export default Button;
