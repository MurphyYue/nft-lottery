import { useState, useEffect } from 'react';
import { LotteryContractConfig } from '@config/constants'
import { readContract } from '@wagmi/core'
import useWallet from '@wallets/useWallet';
import { ethers, utils } from 'ethers';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import axios from 'axios';
import Layout from "Layout";


const NFTDetailPage = () => {
  const { active, address } = useWallet();
  const { openConnectModal } = useConnectModal()
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState([]);

  // owner的第index的NFT的tokenid
  const tokenOfOwnerByIndex = async (index = 0) => {
    if (!active) {
      openConnectModal();
      return;
    }
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'tokenOfOwnerByIndex',
      args: [address, ethers.BigNumber.from(index)]
    });
    return res;
  };
  // 根据tokenId返回URI
  const getTokenURI = async (tokenId) => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'tokenURI',
      args: [tokenId]
    });
    return res;
  };
  const fetchImage = async (ipfsUri) => {
    try {
      const ipfsGateway = 'https://ipfs.io/ipfs/';
      const ipfsHash = ipfsUri.replace('ipfs://', '');
      const url = `${ipfsGateway}${ipfsHash}`;
      const { data } = await axios.get(url);
      const image = data.image.replace('ipfs://', ipfsGateway);
      return image;
    } catch (error) {
      console.error('Failed to fetch image:', error);
    }
  };
  const fetchNFTDetails = async () => {
    if (!active) {
      openConnectModal();
      return;
    }

    try {
      // Get the number of NFTs owned by the user
      const balance = await readContract({
        ...LotteryContractConfig,
        functionName: 'balanceOf',
        args: [address],
      });
      const nftPromises = [];
      for (let i = 0; i < Number(balance); i++) {
        nftPromises.push(fetchNFTByIndex(i));
      }

      const nftDetails = await Promise.all(nftPromises);
      setNfts(nftDetails);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  const fetchNFTByIndex = async (index) => {
    try {
      const tokenId = await tokenOfOwnerByIndex(index);

      const tokenURI = await getTokenURI(tokenId);

      const imageUrl = await fetchImage(tokenURI);
      console.log(tokenId, imageUrl);
      return { tokenId, imageUrl };
    } catch (error) {
      console.error('Error fetching NFT details:', error);
      return null;
    }
  };

  useEffect(() => {
    address && fetchNFTDetails();
  }, [address]);

  return (
    <Layout>
      <div className="w-screen px-16 pt-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 grid-cols-4 gap-4">
            {nfts.map((nft, index) => (
              <div key={index} className="p-4 text-center text-xl">
                <img
                  src={nft.imageUrl}
                  alt={nft.tokenId}
                  className="mb-4 rounded w-full aspect-[4/3] object-cover rounded-3xl"
                />
                <p>Token ID: {nft.tokenId.toString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NFTDetailPage;
