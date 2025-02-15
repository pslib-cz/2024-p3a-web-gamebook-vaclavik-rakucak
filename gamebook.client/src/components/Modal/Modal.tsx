import React, { useEffect } from 'react';
import styles from './Modal.module.css';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Modal se zavře po 3 vteřinách

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                {children}
            </div>
        </div>
    );
};

export default Modal;