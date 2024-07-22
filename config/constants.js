import LotteryABI from '@abis/LotteryABI.json'
import PaymentSplitter from "@abis/PaymentSplitter.json";


export const lotteryContractAddr = "0xe14d2CC014E965a81215de01b7EeA868D23E0Be0";
export const claimContractAddr = "0xd9075770159aee5fa242078bab717f443b3cc607";


export const LotteryContractConfig = {
  address: lotteryContractAddr,
  abi: LotteryABI,
}
export const ClaimContractConfig = {
  address: claimContractAddr,
  abi: PaymentSplitter,
};