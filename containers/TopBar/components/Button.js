import React from 'react';
import { isMobile } from 'react-device-detect';
import { useConnectModal } from "@rainbow-me/rainbowkit";
import WalletIcon from '@icons/topbarWallet.svg';
import styles from '../index.module.scss'

export default function Button() {
  const { openConnectModal } = useConnectModal();

  return (
    <div className={styles.walletBtn} onClick={openConnectModal}>
      <WalletIcon className={styles.walletIcon} />
     {!isMobile&& 'Connect wallet'}
    </div>
  )
}
