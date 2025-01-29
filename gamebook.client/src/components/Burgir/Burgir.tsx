/*⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⣤⣶⣶⣿⣿⣿⣿⣿⣿⠿⠷⣶⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣯⣀⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀
⠀⠀⠀⢠⣿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣁⣈⣽⣿⣷⡀⠀⠀⠀
⠀⠀⠀⣿⣿⣶⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⢿⣧⠀⠀⠀
⠀⠀⠀⠛⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠧⠤⠾⠿⠿⠿⠿⠿⠷⠶⠾⠟⠀⠀⠀
⠀⠀⠀⢶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⠶⠶⠀⠀⠀
⠀⠀⣠⣤⣤⣤⣤⣤⣤⣄⣀⣀⣈⣉⣉⣉⣀⣀⣀⣀⣀⣠⣤⣤⣤⣤⣤⣄⠀⠀
⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀
⠀⠀⢀⣤⣭⠉⠉⠉⢉⣉⡉⠉⠉⠉⣉⣉⠉⠉⠉⢉⣉⠉⠉⠉⢉⣭⣄⠀⠀⠀
⠀⠰⡟⠁⠈⢷⣤⣴⠟⠉⠻⣄⣠⡾⠋⠙⠳⣤⣴⠟⠉⠳⣦⣠⡾⠃⠙⢷⡄⠀
⠀⠀⠀⢀⣀⣀⣉⡀⠀⠀⠀⠈⠉⠀⠀⠀⣀⣈⣁⣀⣀⣀⣀⣉⣀⣀⠀⠀⠀⠀
⠀⠀⠀⠛⠛⠛⠛⠛⠛⠻⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠛⠛⠛⠛⠛⠛⠛⠃⠀⠀
⠀⠀⠀⢸⣿⣿⣿⣿⣷⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣶⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
*/

import React from 'react';
import styles from './Burgir.module.css';

interface BurgirProps {
  onClick: () => void;
  isOpen: boolean;
}

const Burgir: React.FC<BurgirProps> = ({ onClick, isOpen }) => {
  return (
    <div 
      className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} 
      onClick={onClick}
    >
      <div className={`${styles.line} ${isOpen ? styles.line1 : ''}`} />
      <div className={`${styles.line} ${isOpen ? styles.line2 : ''}`} />
      <div className={`${styles.line} ${isOpen ? styles.line3 : ''}`} />
    </div>
  );
};

export default Burgir;