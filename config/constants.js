import VGodABI from "@abis/VGodABI.json";
import PaymentSplitterReferenceABI from "@abis/PaymentSplitterReferenceABI.json";


export const VGodAddr = "0xb21532Cf8310Cc52d27e4476b9f96Ae87dA67278";
export const PaymentSplitterReferenceAddr = "0x807AC06B90B3442334A80CD082622663163dF00C";


export const LotteryContractConfig = {
  address: VGodAddr,
  abi: VGodABI,
}
export const ClaimContractConfig = {
  address: PaymentSplitterReferenceAddr,
  abi: PaymentSplitterReferenceABI,
};