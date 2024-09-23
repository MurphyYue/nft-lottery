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

const useContractData = (address) => {
  const [isPublicSaleTime, setIsPublicSaleTime] = useState(false);
  const [hasMinted, setHasMinted] = useState(false);

  const fetchAllowlistPrice = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "AllowlistPrice",
      args: [],
    });
    return res;
  };

  const fetchPublicSalePrice = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "PublicSalePrice",
      args: [],
    });
    console.log(utils.formatEther(res));
    return res;
  };

  // check if address is in the white list
  const checkAllowlist = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "allowlist",
      args: [address],
    });
    console.log("checkAllowlist", res);
    return res;
  };

  const fetchPublicSaleStartTime = async () => {
    try {
      const res = await readContract({
        ...LotteryContractConfig,
        functionName: "PublicSaleStartTime",
        args: [],
      });
      console.log("PublicSaleStartTime", res);
      return res;
    } catch (error) {
      console.error("Error fetching PublicSaleStartTime:", error);
      return 0;
    }
  };

  const fetchTokenIdOfMinter = async () => {
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

  useEffect(() => {
    const fetchSaleStartTime = async () => {
      const timestamp = await fetchPublicSaleStartTime();
      const publicSaleTime = new Date(Number(timestamp)).getTime(); // 转换为秒
      const now = parseInt(new Date().getTime() / 1000);
      setIsPublicSaleTime(publicSaleTime < now);
    };
    fetchSaleStartTime();
    fetchTokenIdOfMinter();
  }, [address]);

  return {
    isPublicSaleTime,
    hasMinted,
    fetchAllowlistPrice,
    fetchPublicSalePrice,
    checkAllowlist,
  };
};

const Mint = () => {
  const { active, address } = useWallet();
  const { openConnectModal } = useConnectModal();
  const [minting, setMinting] = useState(false);
  const { isPublicSaleTime, hasMinted, fetchAllowlistPrice, fetchPublicSalePrice, checkAllowlist } =
    useContractData(address);

  const allowlistMint = async () => {
    setMinting(true); 
    try {
      const price = await fetchAllowlistPrice();
      await writeContract("allowlistMint", {
      ...LotteryContractConfig,
      functionName: "allowlistMint",
      args: [],
      value: price,
      });
    } catch (error) {
      notify(error, 'error');
      console.error("Error allowlist minting:", error);
    } finally {
      setMinting(false);
    }
  };

  const mint = async () => {
    setMinting(true);
    try {
      const price = await fetchPublicSalePrice();
      await writeContract("mint", {
        ...LotteryContractConfig,
        functionName: "mint",
        args: [],
        value: price,
      });
    } catch (error) {
      notify(error, "error")
      console.error("Error minting:", error);
    } finally {
      setMinting(false);
    }
  };

  const handleMint = async () => {
    if (!active) {
      openConnectModal();
      return;
    }
    if (hasMinted) {
      notify("You have already minted", "error");
      return;
    }
    if (isPublicSaleTime) {
      await allowlistMint();
      return;
    }
    const isAllowlist = await checkAllowlist();
    if (isAllowlist) {
      await allowlistMint();
    } else {
      await mint();
    }
  };

  return (
    <Layout>
      <div className="w-full h-full">
        <div className="p-4 flex flex-col items-center justify-center text-xl w-full">
          <img src={MintBg.src} className="mb-4 w-full aspect-square object-cover rounded-3xl md:w-1/2 lg:w-1/3 2xl:w-1/4" />
          <Button
            color="primary"
            size="xs"
            themeoverride="light"
            variant="filled"
            onClick={handleMint}
            disabled={hasMinted}
            loading={minting}
          >
            Mint
          </Button>
        </div>
        <div className="fixed bottom-0 w-full left-0">
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default Mint;
