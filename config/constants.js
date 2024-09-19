import VGodABI from "@abis/VGodABI.json";
import PaymentSplitterReferenceABI from "@abis/PaymentSplitterReferenceABI.json";


export const VGodAddr = "0x007157850858fCF0Fd98DBF27388483020BeAF94";
export const PaymentSplitterReferenceAddr = "0x40c97c73a96623fc6e7b9b90dc8aeb15f8b47dc1";


export const LotteryContractConfig = {
  address: VGodAddr,
  abi: VGodABI,
}
export const ClaimContractConfig = {
  address: PaymentSplitterReferenceAddr,
  abi: PaymentSplitterReferenceABI,
};