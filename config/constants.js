import VGodABI from "@abis/VGodABI.json";
import PaymentSplitterReferenceABI from "@abis/PaymentSplitterReferenceABI.json";


export const VGodAddr = "0xA1d44063E25b6992893DdD3963cb589157CDbA69";
export const PaymentSplitterReferenceAddr = "0x807AC06B90B3442334A80CD082622663163dF00C";


export const LotteryContractConfig = {
  address: VGodAddr,
  abi: VGodABI,
}
export const ClaimContractConfig = {
  address: PaymentSplitterReferenceAddr,
  abi: PaymentSplitterReferenceABI,
};