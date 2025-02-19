import React, { useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    children2?: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, children2 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1000); // Modal se zavře po 3 vteřinách

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={styles.modalOvberlay}>
            <div className={styles.modal}>
            <div className={styles.modalContent}>
                {children}
            </div>
            <div className={styles.modalContentSmall}>
                {children2}
            </div>
        </div>
        </div>
    );
};

export default Modal;