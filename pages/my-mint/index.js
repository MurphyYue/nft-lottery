import { useState, useEffect } from "react";
import { LotteryContractConfig, ClaimContractConfig } from "@config/constants";
import { readContract } from "@wagmi/core";
import useWallet from "@wallets/useWallet";
import { ethers, utils } from "ethers";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import axios from "axios";
import Layout from "Layout";
import Footer from "@components/Footer";
import { Loader, Button } from "@lidofinance/lido-ui";
import { notify } from "@utils/msgNotify";

const fetchTokenIdOfMinter = async (address) => {
  try {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "tokenIdOfMinter",
      args: [address],
    });
    return res;
  } catch (error) {
    console.log("no token");
    return null;
  }
};

const fetchTokenURI = async (tokenId) => {
  const res = await readContract({
    ...LotteryContractConfig,
    functionName: "tokenURI",
    args: [tokenId],
  });
  return res;
};

const fetchImage = async (ipfsUri) => {
  try {
    const ipfsGateway = "https://violet-cheerful-starfish-646.mypinata.cloud/ipfs/";
    const ipfsHash = ipfsUri.replace("ipfs://", "");
    const url = `${ipfsHash}.json`;
    const { data } = await axios.get(url);
    const image = data.image.replace("ipfs://", ipfsGateway);
    return image;
  } catch (error) {
    console.error("Failed to fetch image:", error);
    return null;
  }
};

const fetchNFT = async (address) => {
  try {
    const tokenId = await fetchTokenIdOfMinter(address);
    if (!tokenId || tokenId.toString() === "0") {
      return null;
    }
    const tokenURI = await fetchTokenURI(tokenId);
    const imageUrl = await fetchImage(tokenURI);
    return { tokenId, imageUrl };
  } catch (error) {
    console.error("Error fetching NFT details:", error);
    return null;
  }
};

const fetchReleasable = async (address) => {
  try {
    const res = await readContract({
      ...ClaimContractConfig,
      functionName: "releasable",
      args: [address],
    });
    return Number(res);
  } catch (error) {
    console.error("Error fetching releasable royalties:", error);
    return 0;
  }
};

const fetchReleased = async (address) => {
  try {
    const res = await readContract({
      ...ClaimContractConfig,
      functionName: "released",
      args: [address],
    });
    return Number(res);
  } catch (error) {
    notify("Failed to fetch released royalties", "error");
    console.error("Error fetching released royalties:", error);
    return 0;
  }
};

const fetchRelease = async (address) => {
  try {
    await readContract({
      ...ClaimContractConfig,
      functionName: "release",
      args: [address],
    });
    return true;
  } catch (error) {
    notify("You have no shares", "error");
    console.error("Error releasing royalties:", error);
    return false;
  }
};

const NFTDetailPage = () => {
  const { active, address } = useWallet();
  const [loading, setLoading] = useState(true);
  const [mintedNft, setMintedNft] = useState({});
  const [releasable, setReleasable] = useState(0);
  const [released, setReleased] = useState(0);
  const [releasing, setReleasing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const nft = await fetchNFT(address);
        nft && setMintedNft(nft);
        const [releasableAmount, releasedAmount] = await Promise.all([
          address && fetchReleasable(address),
          address && fetchReleased(address),
        ]);
        setReleasable(releasableAmount);
        setReleased(releasedAmount);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [address]);

  const handleRelease = async () => {
    setReleasing(true);
    const success = await fetchRelease(address);
    if (success) {
      setReleased((prev) => prev + releasable);
      setReleasable(0);
    }
    setReleasing(false);
  };

  return (
    <Layout>
      <div className="w-screen px-4 sm:px-8 lg:px-16 pt-4">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Loader />
          </div>
        ) : mintedNft?.imageUrl || mintedNft?.tokenId ? (
          <div className="flex justify-center">
            <div className="text-center text-xl">
              <img
                src={mintedNft.imageUrl}
                alt={mintedNft.imageUrl ? mintedNft.tokenId : "failed to get nft image"}
                className="mb-4 w-full aspect-[4/3] object-cover rounded-3xl"
              />
              <div className="flex justify-between items-center">
                <span className="text-slate-500 mr-4">
                  Releasable： <span className="text-black">{releasable}</span>
                </span>
                <span className="text-slate-500 mr-4">
                  Released： <span className="text-black">{released}</span>
                </span>
                <Button
                  color="primary"
                  size="xs"
                  themeoverride="light"
                  variant="filled"
                  onClick={handleRelease}
                  disabled={releasable === 0}
                  loading={releasing}
                >
                  Release
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-xl mt-10">
            <p>No NFT minted</p>
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