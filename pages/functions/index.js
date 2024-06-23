import { LotteryContractConfig } from '@config/constants'
import { readContract } from '@wagmi/core'
import { writeContract } from '@hooks/operateContract';
import useWallet from '@wallets/useWallet';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { ethers, utils } from 'ethers';
import { useState, useEffect } from 'react';

const Home = () => {
  const { active, address } = useWallet();
  const { openConnectModal } = useConnectModal()
  const handleDraw = async () => {

  };
  // NFT总量
  const Cap = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'Cap',
      args: []
    });
    console.log(res);
  };
  // 公售时间
  const PublicSaleStartTime = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'PublicSaleStartTime',
      args: []
    });
    console.log(res);
    return res;
  };
  // white list price
  const AllowlistPrice = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'AllowlistPrice',
      args: []
    });
    console.log(utils.formatEther(res));
    return Promise.resolve(res);
  };
  // publice sale price
  const PublicSalePrice = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'PublicSalePrice',
      args: []
    });
    console.log(utils.formatEther(res));
    return Promise.resolve(res);
  };
  // NFT信息的基础URI
  const BaseURI = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'BaseURI',
      args: []
    });
    console.log(res);
  };
  // check address is in allowlist
  const allowlist = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'allowlist',
      args: [address]
    });
    console.log(res);
  };
  // owner的第index的NFT的tokenid
  const tokenOfOwnerByIndex = async () => {
    if (!active) {
      openConnectModal();
      return;
    }
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'tokenOfOwnerByIndex',
      args: [address, ethers.BigNumber.from(0)]
    });
    console.log(res);
    return res;
  };
  // 总共mint了多少NFT
  const totalSupply = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'totalSupply',
      args: []
    });
    console.log(Number(res));
  };
  // 根据tokenId返回URI
  const tokenURI = async () => {
    const tokenId = await tokenOfOwnerByIndex();
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'tokenURI',
      args: [tokenId]
    });
    console.log(res);
    return res;
  };
  // 某个用户有多少个nft
  const balanceOf = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'balanceOf',
      args: [address]
    });
    console.log(Number(res));
  };
  // whitelist adress mint，value = AllowlistPrice()
  const allowlistMint = async () => {
    const price = await AllowlistPrice();
    console.log(price);
    await writeContract('allowlistMint', {
      ...LotteryContractConfig,
      functionName: 'allowlistMint',
      args: [],
      value: price
    })
    // console.log(res);
  };
  // publice sale mint, value = PublicSalePrice()
  const mint = async () => {
    const price = await PublicSalePrice();
    console.log(price)
    await writeContract('mint', {
      ...LotteryContractConfig,
      functionName: 'mint',
      args: [],
      value: price
    })
    // console.log(res);
  };

  return (
    <div className="min-h-screen px-16 mt-4">
      <main className="flex p-4">
        <div className="basis-2/3">
          <h2 className="text-xl font-bold mb-2">项目介绍</h2>
          <p>这里是项目的详细介绍...</p>
          <div>
            <button onClick={Cap} className="px-4 py-2 bg-green-500 text-white rounded m-2">NFT总量</button>
            <button onClick={PublicSaleStartTime} className="px-4 py-2 bg-green-500 text-white rounded m-2">公售时间</button>
            <button onClick={AllowlistPrice} className="px-4 py-2 bg-green-500 text-white rounded m-2">白名单购买的价格</button>
            <button onClick={PublicSalePrice} className="px-4 py-2 bg-green-500 text-white rounded m-2">公售价格</button>
            <button onClick={BaseURI} className="px-4 py-2 bg-green-500 text-white rounded m-2">NFT信息的基础URI</button>
            <button onClick={allowlist} className="px-4 py-2 bg-green-500 text-white rounded m-2">是否在白名单内</button>
            <button onClick={tokenOfOwnerByIndex} className="px-4 py-2 bg-green-500 text-white rounded m-2">owner的第index的NFT的tokenId</button>
            <button onClick={totalSupply} className="px-4 py-2 bg-green-500 text-white rounded m-2">总共mint了多少NFT</button>
            <button onClick={tokenURI} className="px-4 py-2 bg-green-500 text-white rounded m-2">根据tokenId返回URI</button>
            <button onClick={balanceOf} className="px-4 py-2 bg-green-500 text-white rounded m-2">某个用户有多少个nft</button>
          </div>
          <div>
            <button onClick={allowlistMint} className="px-4 py-2 bg-green-500 text-white rounded m-2">白名单mint</button>
            <button onClick={mint} className="px-4 py-2 bg-green-500 text-white rounded">公售mint</button>
          </div>
        </div>
        <div className="basis-1/3 text-center">
          <div className="w-full min-h-96 border-2 border-gray-300 mb-4 p-2">
            
          </div>
          <button onClick={handleDraw} className="px-4 py-2 bg-green-500 text-white rounded">开始抽奖</button>
        </div>
      </main>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">所有NFT图片</h3>
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="w-24 h-24 border-2 border-gray-300 flex items-center justify-center">
              <p>{i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;


