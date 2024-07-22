import { useState, useEffect } from "react";
import { LotteryContractConfig, ClaimContractConfig } from "@config/constants";
import { readContract } from "@wagmi/core";
import useWallet from "@wallets/useWallet";
import { ethers, utils } from "ethers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import axios from "axios";
import Layout from "Layout";
import Footer from "@components/Footer";
import { Loader, Button } from '@lidofinance/lido-ui';
import { notify } from '@utils/msgNotify';

const NFTDetailPage = () => {
  const { active, address } = useWallet();
  const { openConnectModal } = useConnectModal();
  const [loading, setLoading] = useState(true);
  const [mintedNft, setMintedNft] = useState({});
  const [releasable, setReleasable] = useState(0);
  const [released, setReleased] = useState(0);
  const [releasing, setReleasing] = useState(false);

  // 查询某个地址已经mint的token id，0n表示没有mint
  const tokenIdOfMinter = async (index = 0) => {
    if (!active) {
      openConnectModal();
      return;
    }
    try {
      const res = await readContract({
        ...LotteryContractConfig,
        functionName: "tokenIdOfMinter",
        args: [address],
      });
      return res;
    } catch (error) {
      console.log('no token');
    }

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

  const fetchNFT = async () => {
    try {
      const tokenId = await tokenIdOfMinter();
      if (tokenId.toString() === "0") {
        return;
      }
      const tokenURI = await getTokenURI(tokenId);

      const imageUrl = await fetchImage(tokenURI);
      setMintedNft({ tokenId, imageUrl });
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
  const fetchRelease = async () => {
    setReleasing(true);
    try {
      await readContract({
        ...ClaimContractConfig,
        functionName: "release",
        args: [address],
      });
      setReleasing(false);
      await fetchReleased();
    } catch (error) {
      notify('You have no shares', 'error');
    } finally {
      setReleasing(false);
    }
  };

  useEffect(() => {
    address && fetchNFT();
    address && fetchReleasable();
    address && fetchReleased();
  }, [address]);

  return (
    <Layout>
      <div className="w-screen px-4 sm:px-8 lg:px-16 pt-4">
        {loading ? (
          <div className="flex justify-center items-center h-96"><Loader /></div>
        ) : (
          mintedNft.imageUrl ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-center text-xl">
                <img
                  src={mintedNft.imageUrl}
                  alt={mintedNft.tokenId}
                  className="mb-4 w-full aspect-[4/3] object-cover rounded-3xl"
                />
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">
                    Releasable： <span className="text-black">{releasable}</span>
                  </span>
                  <span className="text-slate-500">
                    Released： <span className="text-black">{released}</span>
                  </span>
                  <Button
                    color="primary"
                    size="xs"
                    themeOverride="light"
                    variant="filled"
                    onClick={fetchRelease}
                    disabled={releasable === 0}
                    loading={releasing}
                  >
                    Release
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-xl">
              <p>No NFT minted</p>
            </div>
          )
        )}
        <div className="fixed bottom-0 w-full left-0">
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default NFTDetailPage;
