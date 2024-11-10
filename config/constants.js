import VGodABI from "@abis/VGodABI.json";
import PaymentSplitterReferenceABI from "@abis/PaymentSplitterReferenceABI.json";


export const VGodAddr = "0xE63720252A07ed3E88852888bfC4D02bC88B5521";
export const PaymentSplitterReferenceAddr = "0x40c97c73a96623fc6e7b9b90dc8aeb15f8b47dc1";


export const LotteryContractConfig = {
  address: VGodAddr,
  abi: VGodABI,
}
export const ClaimContractConfig = {
  address: PaymentSplitterReferenceAddr,
  abi: PaymentSplitterReferenceABI,
};