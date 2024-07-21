import { useState, useEffect } from "react";
import { LotteryContractConfig, ClaimContractConfig } from "@config/constants";
import { readContract } from "@wagmi/core";
import useWallet from "@wallets/useWallet";
import { ethers, utils } from "ethers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import axios from "axios";
import Layout from "Layout";
import Footer from "@components/Footer";

const NFTDetailPage = () => {
  const { active, address } = useWallet();
  const { openConnectModal } = useConnectModal();
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState([]);
  const [releasable, setReleasable] = useState(0);
  const [released, setReleased] = useState(0);

  // owner的第index的NFT的tokenid
  const tokenOfOwnerByIndex = async (index = 0) => {
    if (!active) {
      openConnectModal();
      return;
    }
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "tokenOfOwnerByIndex",
      args: [address, ethers.BigNumber.from(index)],
    });
    return res;
  };
  // 根据tokenId返回URI
  const getTokenURI = async (tokenId) => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "tokenURI",
      args: [tokenId],
    });
    return res;
  };
  const fetchImage = async (ipfsUri) => {
    try {
      const ipfsGateway = "https://ipfs.io/ipfs/";
      const ipfsHash = ipfsUri.replace("ipfs://", "");
      const url = `${ipfsGateway}${ipfsHash}`;
      const { data } = await axios.get(url);
      const image = data.image.replace("ipfs://", ipfsGateway);
      return image;
    } catch (error) {
      console.error("Failed to fetch image:", error);
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
        functionName: "balanceOf",
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
      console.error("Error fetching NFTs:", error);
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
      console.error("Error fetching NFT details:", error);
      return null;
    }
  };
  // 查询某个地址收取的版权费用
  const fetchReleasable = async () => {
    const res = await readContract({
      ...ClaimContractConfig,
      functionName: "releasable",
      args: [address],
    });
    console.log(Number(res));
    setReleasable(Number(res));
  };
  // 查询某个地址已经领取的版权费用
  const fetchReleased = async () => {
    setLoading(true);
    const res = await readContract({
      ...ClaimContractConfig,
      functionName: "released",
      args: [address],
    });
    setLoading(false);
    console.log(Number(res));
    setReleased(Number(res));
  };
  // 领取版税
  const fetchRelease= async () => {
    setLoading(true);
    await readContract({
      ...ClaimContractConfig,
      functionName: "release",
      args: [address],
    });
    setLoading(false);
    await fetchReleased();
  };

  useEffect(() => {
    // address && fetchNFTDetails();
    address && fetchReleasable();
    address && fetchReleased();
  }, [address]);

  return (
    <Layout>
      <div className="w-screen px-4 sm:px-8 lg:px-16 pt-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nfts.map((nft, index) => (
              <div key={index} className="text-center text-xl">
                <img
                  src={nft.imageUrl}
                  alt={nft.tokenId}
                  className="mb-4 w-full aspect-[4/3] object-cover rounded-3xl"
                />
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">
                    Releasable： <span className="text-black">{releasable}</span>
                  </span>
                  <span className="text-slate-500">
                    Released： <span className="text-black">{released}</span>
                  </span>
                  <button
                    onClick={fetchRelease}
                    className="px-4 py-2 bg-green-500 text-white rounded m-2"
                  >
                    Release
                  </button>
                </div>
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
