import VGodABI from "@abis/VGodABI.json";
import PaymentSplitterReferenceABI from "@abis/PaymentSplitterReferenceABI.json";


export const VGodAddr = "0x6f4Ec68f61F5EC04A83a409DbB5496e5F70D434b";
export const PaymentSplitterReferenceAddr = "0x807AC06B90B3442334A80CD082622663163dF00C";


export const LotteryContractConfig = {
  address: VGodAddr,
  abi: VGodABI,
}
export const ClaimContractConfig = {
  address: PaymentSplitterReferenceAddr,
  abi: PaymentSplitterReferenceABI,
};