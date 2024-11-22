
import React from "react";
import Etherscan from '@icons/Etherscan.svg';
import Twitter from '@icons/Twitter.svg';
import Warpcaster from '@icons/Warpcaster.svg';
import MagicEden from "@icons/magicEdn.svg";
import styles from './index.module.scss'
import { LotteryContractConfig } from "@config/constants";


const Footer = () => {
  return (
    <div className={styles.root}>
      <a
        href="https://etherscan.io/address/0x6f4Ec68f61F5EC04A83a409DbB5496e5F70D434b"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.beta}
      >
        <Etherscan className={styles.icon} />
        <span className="hidden sm:inline">Etherscan</span>
      </a>
      <a
        href="https://x.com/vgod_not_vdog"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.beta}
      >
        <Twitter className={styles.icon} />
        <span className="hidden sm:inline">Twitter</span>
      </a>
      {/* <a className={styles.beta}>
        <Warpcaster className={styles.icon} />
        <span className="hidden sm:inline">Warpcaster</span>
      </a> */}
      {/* <a
        href={`https://magiceden.io/collections/polygon/${LotteryContractConfig.address}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.beta}
      >
        <MagicEden className={styles.icon} />
        <span className="hidden sm:inline">MagicEden</span>
      </a> */}
    </div>
  );
}
export default Footer; 
