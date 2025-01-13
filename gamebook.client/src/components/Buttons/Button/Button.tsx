import { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  onClick: () => void;
  children: ReactNode;
  disabled?: boolean;
}

function Button({ onClick, children, disabled }: ButtonProps) {
  return (
    <button onClick={onClick} className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;