import { useState, useEffect } from 'react';
import { LotteryContractConfig } from '@config/constants'
import { readContract } from '@wagmi/core'
import useWallet from '@wallets/useWallet';
import { ethers, utils } from 'ethers';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import axios from 'axios';
import Layout from "Layout";
import Footer from '@components/Footer';
import { Loader } from '@lidofinance/lido-ui';


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
    console.log(index)
    try {
      const res = await readContract({
        ...LotteryContractConfig,
        functionName: 'tokenOfOwnerByIndex',
        args: [address, ethers.BigNumber.from(index)]
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log('no token');
    }
  };
  // 根据tokenId返回URI
  const getTokenURI = async (tokenId) => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'tokenURI',
      args: [tokenId]
    });
    console.log('getTokenURI',res);
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
      console.log(balance);
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
      console.log(index)
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
      <div className="w-screen px-4 sm:px-8 lg:px-16 pt-4">
        {loading ? (
          <div className="flex justify-center items-center h-96"><Loader /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nfts.map((nft, index) => (
              <div
                key={index}
                className="text-center text-xl">
                <img
                  src={nft.imageUrl}
                  alt={nft.tokenId}
                  className="mb-4 w-full aspect-[4/3] object-cover rounded-3xl"
                />
                <p>Token ID: {nft.tokenId.toString()}</p>
              </div>
            ))}
          </div>
        )}
        <div className="fixed bottom-0 w-full left-0">
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default NFTDetailPage;
