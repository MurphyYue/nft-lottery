import { useState, useEffect } from "react";
import { LotteryContractConfig, ClaimContractConfig } from "@config/constants";
import { readContract } from "@wagmi/core";
import { writeContract } from "@hooks/operateContract";
import useWallet from "@wallets/useWallet";
import axios from "axios";
import Layout from "Layout";
import Footer from "@components/Footer";
import { Loader, Button } from "@lidofinance/lido-ui";
import { notify } from "@utils/msgNotify";
import { ethers } from "ethers";

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
    const url = `${ipfsHash}`;
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

const fetchReleasable = async (address, claimContractAddress) => {
  try {
    const res = await readContract({
      ...ClaimContractConfig,
      address: claimContractAddress,
      functionName: "releasable",
      args: [address],
    });
    const releasable = ethers.utils.formatUnits(res, 18);
    return releasable;
  } catch (error) {
    console.error("Error fetching releasable royalties:", error);
    return 0;
  }
};

const fetchReleased = async (address, claimContractAddress) => {
  try {
    const res = await readContract({
      ...ClaimContractConfig,
      address: claimContractAddress,
      functionName: "released",
      args: [address],
    });
    const released = ethers.utils.formatUnits(res, 18);
    console.log("fetchReleased", released);
    return released;
  } catch (error) {
    notify("Failed to fetch released royalties", "error");
    console.error("Error fetching released royalties:", error);
    return 0;
  }
};

const fetchRelease = async (address, claimContractAddress) => {
  try {
    const res = await writeContract("release", {
      ...ClaimContractConfig,
      address: claimContractAddress,
      functionName: "release",
      args: [address],
      gasLimit: 100000,
    });
    console.log("relese", res)
    return true;
  } catch (error) {
    notify("release error", "error");
    console.error("Error releasing royalties:", error);
    return false;
  }
};

const fetchPaymentSplittersOfMinter = async (address) => {
  try {
    const addresses = await readContract({
      ...LotteryContractConfig,
      functionName: "paymentSplittersOfMinter",
      args: [address],
    });
    // return address for ClaimContract's address
    return addresses[0] || null;
  } catch (error) {
    notify("get mint address error", "error");
    console.error("Error releasing royalties:", error);
    return false;
  }
};

// determine whether the current address's user is an minter.
const minterValidate = async (address) => {
  try {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "haveMinted",
      args: [address],
    });
    console.log("minter", res);
    return res;
  } catch (error) {
    notify("You are not minter", "error");
    console.error("Error haveMinted:", error);
    return false;
  }
}

const NFTDetailPage = () => {
  const { active, address } = useWallet();
  const [loading, setLoading] = useState(true);
  const [mintedNft, setMintedNft] = useState({});
  const [releasable, setReleasable] = useState(0);
  const [released, setReleased] = useState(0);
  const [releasing, setReleasing] = useState(false);
  const [claimContractAddress, setClaimContractAddress] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const isMinter = await minterValidate(address);
        if (isMinter) {
          const nft = await fetchNFT(address);
          nft && setMintedNft(nft);
          const claimAddress = await fetchPaymentSplittersOfMinter(address);
          if (claimAddress) {
            setClaimContractAddress(claimAddress);
            const [releasableAmount, releasedAmount] = await Promise.all([
              address && fetchReleasable(address, claimAddress),
              address && fetchReleased(address, claimAddress),
            ]);
            setReleasable(releasableAmount);
            setReleased(releasedAmount);
          }
        } else {
          notify("You are not minter", "error");
        }
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
    const success = await fetchRelease(address, claimContractAddress);
    if (success) {
      const [releasableAmount, releasedAmount] = await Promise.all([
        address && fetchReleasable(address, claimContractAddress),
        address && fetchReleased(address, claimContractAddress),
      ]);
      setReleasable(releasableAmount);
      setReleased(releasedAmount);
    }
    setReleasing(false);
  };

  // modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // disable scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);
  return (
    <Layout>
      <div className="w-screen px-4 sm:px-8 lg:px-16 pt-4">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Loader />
          </div>
        ) : mintedNft?.imageUrl || mintedNft?.tokenId ? (
          <div className="flex justify-center flex-col items-center">
            <img
              src={mintedNft.imageUrl}
              alt={mintedNft.imageUrl ? mintedNft.tokenId : "failed to get nft image"}
              className="mb-4 w-full aspect-square object-cover rounded-3xl md:w-1/2 lg:w-1/3 2xl:w-1/4 cursor-pointer"
              onClick={() => mintedNft.imageUrl && setIsModalOpen(true)}
            />
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                <img
                  src={mintedNft.imageUrl}
                  alt="Full Project Image"
                  className="max-w-full max-h-full object-contain cursor-pointer"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>
            )}
            <div className="text-center text-xl">
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
                  disabled={releasable == 0}
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
