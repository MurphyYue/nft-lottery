import RedPacketABI from '@abis/RedPacketABI'
import MessaheABI from '@abis/MessageABI.json'
import FreeMintABI from '@abis/MintMeMe.json'
import LotteryABI from '@abis/LotteryABI.json'

export const MessageServiceContract = '0x7f4EDca490998Fb9D3175307A9907b43a14b26C9'
export const SendRewardContract = '0xA1d44063E25b6992893DdD3963cb589157CDbA69'
export const virtualHumanContract = "0xB6Fa3A915AA196158284310F1e2489824f18f458";
export const virtualHumanSharesContract = "0x711Cbb9f5348ee75FF83d64BDad1B9e199fDAbF2";
export const genesisMemberContractAddr = '0xCA999899d0D7b87b2C040dd90e890d281FE616c5';

export const lotteryContractAddr = '0xdD3f387675497D96A46d6f87a83D5dB63ad48ba3';



export const messageContractConfig = {
  address: MessageServiceContract,
  abi: MessaheABI,
}

export const FreeMintContractConfig = {
  address: genesisMemberContractAddr,
  abi: FreeMintABI,
}

export const LotteryContractConfig = {
  address: lotteryContractAddr,
  abi: LotteryABI,
}