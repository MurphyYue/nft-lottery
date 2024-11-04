import Layout from "Layout";
import { useState, useEffect } from "react";
import MintBg from "@images/mint_bg.gif";
import { LotteryContractConfig } from "@config/constants";
import { readContract } from "@wagmi/core";
import { writeContract } from "@hooks/operateContract";
import useWallet from "@wallets/useWallet";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { utils } from "ethers";
import Footer from "@components/Footer";
import { notify } from "@utils/msgNotify";
import { Button } from "@lidofinance/lido-ui";
import MintModal from "./MintModal";

const useContractData = (address) => {
  const [hasMinted, setHasMinted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [salePrice, setSalePrice] = useState(0);

  const fetchSalePrice = async () => {
    try {
      const res = await readContract({
        ...LotteryContractConfig,
        functionName: "SalePrice",
        args: [],
      });
      console.log(utils.formatEther(res));
      setSalePrice(res);
    } catch (error) {
      console.error("Error fetching sale price:", error);
    }
  };

  const checkHasMinted = async () => {
    try {
      const res = await readContract({
        ...LotteryContractConfig,
        functionName: "tokenIdOfMinter",
        args: [address],
      });
      setHasMinted(res.toString() !== "0");
    } catch (error) {
      console.error("Error fetching tokenIdOfMinter:", error);
    }
  };

  const fetchPaused = async () => {
    try {
      const res = await readContract({
        ...LotteryContractConfig,
        functionName: "paused",
        args: [],
      });
      setIsPaused(res);
    } catch (error) {
      console.error("Error fetching paused:", error);
    }
  };

  useEffect(() => {
    // check if user has minted
    checkHasMinted();
    // check if mint is paused
    fetchPaused();
    // fetch sale price
    fetchSalePrice();
  }, [address]);

  return {
    hasMinted,
    salePrice,
    isPaused,
  };
};

const Mint = () => {
  // if wallet is connected, fetch user's mint status
  const { active, address } = useWallet();
  const { openConnectModal } = useConnectModal();
  // minting state
  const [minting, setMinting] = useState(false);
  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // contract data
  const { hasMinted, salePrice, isPaused } = useContractData(address);

  const mint = async (address) => {
    setMinting(true);
    try {
      await writeContract("mint", {
        ...LotteryContractConfig,
        functionName: "mint",
        args: [address],
        value: salePrice,
      });
    } catch (error) {
      notify(error, "error");
      console.error("Error minting:", error);
    } finally {
      setMinting(false);
    }
  };
  const manageMint = () => {
    if (!active) {
      openConnectModal();
      return;
    }
    // show mint modal
    setIsModalOpen(true);
  };

  const handleMint = async (inviterAddress) => {
    if (!active) {
      openConnectModal();
      return;
    }
    setIsModalOpen(false);
    if (hasMinted) {
      notify("You have already minted", "error");
      return;
    }
    if (isPaused) {
      notify("Mint is paused", "error");
      return;
    } else {
      await mint(inviterAddress);
    }
  };

  return (
    <Layout>
      <div className="w-full h-full">
        <div className="p-4 flex flex-col items-center justify-center text-xl w-full">
          <img
            src={MintBg.src}
            className="mb-4 w-full aspect-square object-cover rounded-3xl md:w-1/2 lg:w-1/3 2xl:w-1/4"
          />
          {isPaused ? (
            <div>Mint coming soon !</div>
          ) : (
            <Button
              color="primary"
              size="xs"
              themeoverride="light"
              variant="filled"
              onClick={manageMint}
              disabled={hasMinted}
              loading={minting}
            >
              Mint
            </Button>
          )}
        </div>
        <div className="fixed bottom-0 w-full left-0">
          <Footer />
        </div>
      </div>
      <MintModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMint={handleMint}
      />
    </Layout>
  );
};

export default Mint;
