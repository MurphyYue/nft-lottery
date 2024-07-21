import LotteryABI from '@abis/LotteryABI.json'
import PaymentSplitter from "@abis/PaymentSplitter.json";


export const lotteryContractAddr = "0xCE866c0DAaaEb37135C3b39229FEBeA1D5D1d03e";
export const claimContractAddr = "0xd9075770159aee5fa242078bab717f443b3cc607";


export const LotteryContractConfig = {
  address: lotteryContractAddr,
  abi: LotteryABI,
}
export const ClaimContractConfig = {
  address: claimContractAddr,
  abi: PaymentSplitter,
};