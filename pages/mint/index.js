import Layout from "Layout";
import MintBg from "@images/mint_bg.png";
import { LotteryContractConfig } from "@config/constants";
import { readContract } from "@wagmi/core";
import { writeContract } from "@hooks/operateContract";
import useWallet from "@wallets/useWallet";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ethers, utils } from "ethers";
import Footer from '@components/Footer';

const Mint = () => {
  const { active, address } = useWallet();
  const { openConnectModal } = useConnectModal();
  // allowlist price
  const AllowlistPrice = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: "AllowlistPrice",
      args: [],
    });
    console.log(utils.formatEther(res));
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
    console.log(res);
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
    // first check address is in allowlist, if not, call mint function, else call allowlistMint function.
    const isAllowlist = await allowlist();
    if (isAllowlist) {
      await allowlistMint();
    } else {
      await mint();
    }

  };
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="p-4 text-center text-xl ">
          <img src={MintBg.src} className="mb-4 w-full aspect-[4/3] object-cover rounded-3xl" />
          <button onClick={handleMint} className="px-8 py-2 bg-zinc-200 text-blalck rounded">
            Mint
          </button>
        </div>
        <div className="fixed bottom-0 w-full left-0">
          <Footer />
        </div>
      </div>
    </Layout>
  );
};

export default Mint;