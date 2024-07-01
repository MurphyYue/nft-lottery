
import React from "react";
import Etherscan from '@icons/Etherscan.svg';
import Twitter from '@icons/Twitter.svg';
import Warpcaster from '@icons/Warpcaster.svg';
import styles from './index.module.scss'


const Footer = () => {
  return (
    <div className={styles.root}>
      <div className={styles.beta}>
        <Etherscan className={styles.icon} />
        <span className="hidden sm:inline">Etherscan</span>
      </div>
      <div className={styles.beta}>
        <Twitter className={styles.icon} />
        <span className="hidden sm:inline">Twitter</span>
      </div>
      <div className={styles.beta}>
        <Warpcaster className={styles.icon} />
        <span className="hidden sm:inline">Warpcaster</span>
      </div>
    </div>
  );
}
export default Footer; 
