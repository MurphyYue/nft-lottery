import React, { useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";
import Router, { useRouter } from "next/router";
import useWallet from "@wallets/useWallet";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { readContract } from "@wagmi/core";
import { LotteryContractConfig } from "@config/constants";
import { dispatch } from '@store/index';
import { setMinted, setHasNft } from '@store/user';
import { useSelector } from 'react-redux';

// determine whether the current address's user is an minter.
const minterValidate = async (address) => {
  try {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "haveMinted",
      args: [address],
    });
    return res;
  } catch (error) {
    // notify("You are not minter", "error");
    console.error("Error haveMinted:", error);
    return false;
  }
};

const nftBalance = async (address) => {
  try {
    const balance = await readContract({
      ...LotteryContractConfig,
      functionName: "balanceOf",
      args: [address],
    });
    return Number(balance);
  } catch (error) {
    console.error("Error fetching NFTs:", error);
  }
}

export default function Tabs({ tabs = [] }) {
  const { active, address } = useWallet();
  const minted = useSelector((state) => state.user.minted);
  const hasNft = useSelector((state) => state.user.hasNft);
  useEffect(() => {
    const fetchData = async () => {
      const haveMinted1 = await minterValidate(address);
      dispatch(setMinted(haveMinted1 && active));
      const nftNumber = await nftBalance(address);
      dispatch(setHasNft(nftNumber > 0 && active));
    }
    active && fetchData();
  }, [address]);
  const { asPath } = useRouter();
  const { openConnectModal } = useConnectModal();

  const go = useCallback(
    (tab) => {
      if (tab.needLogin && !active) {
        openConnectModal();
        return;
      }
      Router.push(tab.path);
    },
    [active],
  );

  return (
    <div className={`${styles.root}`}>
      {tabs.map((tab, i) => {
        let shouldRender = tab.nftNumber ? hasNft : minted || !tab.minter;
        return (
          shouldRender && (
            <div
              key={`${tab.name}-${i}`}
              className={`${styles.navItem} ${asPath === tab.path ? styles.active : ""}`}
              onClick={() => go(tab)}
            >
              {tab.name}
            </div>
          )
        );
      })}
    </div>
  );
}
