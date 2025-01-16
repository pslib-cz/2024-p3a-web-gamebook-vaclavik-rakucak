import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './routeButton.module.css';

type ButtonProps = {
    route: string;
    label?: string;
    nonvisible?: boolean;
}


const Button: React.FC<ButtonProps> = ({route, label, nonvisible}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route);
    };

    if (nonvisible) {
        return (
            <button onClick={handleClick} className={styles.buttonNonVisible}> {/*Pro pouziti na mape pro town*/}
            </button>
        );
    }
    else{
        <button onClick={handleClick} className={styles.button}> 
            {label}
        </button>
    }
    
};

export default Button;
