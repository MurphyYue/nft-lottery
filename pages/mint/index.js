import Layout from "Layout";
import { useState, useEffect } from "react";
import MintBg from "@images/mint_bg.png";
import { LotteryContractConfig } from "@config/constants";
import { readContract } from "@wagmi/core";
import { writeContract } from "@hooks/operateContract";
import useWallet from "@wallets/useWallet";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ethers, utils } from "ethers";
import Footer from '@components/Footer';
import { notify } from '@utils/msgNotify';
import { Button } from '@lidofinance/lido-ui';

const Mint = () => {
  const { active, address } = useWallet();
  const { openConnectModal } = useConnectModal();
  const [minting, setMinting] = useState(false);
  // allowlist price
  const AllowlistPrice = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "AllowlistPrice",
      args: [],
    });
    return Promise.resolve(res);
  };
  // publice sale price
  const PublicSalePrice = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "PublicSalePrice",
      args: [],
    });
    console.log(utils.formatEther(res));
    return Promise.resolve(res);
  };
  // check address is in allowlist
  const allowlist = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "allowlist",
      args: [address],
    });
    console.log(res);
    return res;
  };
  // allowlistMint adress mint，value = AllowlistPrice()
  const allowlistMint = async () => {
    const price = await AllowlistPrice();
    console.log(price);
    await writeContract("allowlistMint", {
      ...LotteryContractConfig,
      functionName: "allowlistMint",
      args: [],
      value: price,
    });
  };
  // publice sale mint, value = PublicSalePrice()
  const mint = async () => {
    const price = await PublicSalePrice();
    console.log(price);
    await writeContract("mint", {
      ...LotteryContractConfig,
      functionName: "mint",
      args: [],
      value: price,
    });
    // console.log(res);
  };
  // mint
  const handleMint = async () => {
    if (!active) {
      openConnectModal();
      return;
    }
    if (hasMinted) {
      notify('You have already minted', 'error');
      return;
    }
    if (isPublicSaleTime) {
      // TODO: change to mint
      await mint();
      return;
    }
    // first check address is in allowlist, if not, call mint function, else call allowlistMint function.
    const isAllowlist = await allowlist();
    if (isAllowlist) {
      await allowlistMint();
    } else {
      await mint();
    }

  };
  const PublicSaleStartTime = async () => {
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
  const [isPublicSaleTime, setIsPublicSaleTime] = useState(false);
  const [hasMinted, setHasMinted] = useState(false);
  // 查询某个地址已经mint的token id，0n表示没有mint
  const tokenIdOfMinter = async () => {
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
      const timestamp = await PublicSaleStartTime();
      const publicSaleTime = new Date(Number(timestamp)).getTime(); // 转换为秒
      const now = parseInt(new Date().getTime() / 1000);
      setIsPublicSaleTime(publicSaleTime < now);
    };
    fetchSaleStartTime();
    tokenIdOfMinter();
  }, []);
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="p-4 text-center text-xl ">
          <img src={MintBg.src} className="mb-4 w-full aspect-[4/3] object-cover rounded-3xl" />
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