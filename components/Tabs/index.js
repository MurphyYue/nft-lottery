import React, { useCallback } from 'react';
import styles from './index.module.scss'
import { isMobile } from 'react-device-detect';
import Router, { useRouter } from 'next/router';
import useWallet from '@wallets/useWallet';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export default function Tabs({ tabs = [], className = '' }) {
  const { asPath, pathname } = useRouter()
  const { active } = useWallet()
  const { openConnectModal } = useConnectModal()

  const go = useCallback((tab) => {
    if (tab.needLogin && !active) {
      openConnectModal()
      return
    }
    Router.push(tab.path)
  }, [active])
  console.info(pathname)

  return (
    <div className={`${styles.root} ${className}`}>
      {tabs.map((tab, i) => (
        <div key={`${tab.name}-${i}`} className={`${styles.navItem} ${asPath === tab.path ? styles.active : ''}`} onClick={() => go(tab)}>
          {asPath === tab.path ? tab.activeIcon : tab.icon}
          {isMobile ? '' : tab.name}
        </div>
      )
      )}
    </div>
  );
}
