import { VGodAddr } from "@config/constants";
import { dispatch } from "@store/index";
import { setSubmitModalParam } from "@store/ui";
import { hashNotify } from "@utils/msgNotify";
import { sendTransaction as sendTransactionWagmi, writeContract as writeContractWagmi, waitForTransaction } from '@wagmi/core';
import { capitalize } from "lodash";
import { ethers } from "ethers";
import { parseGwei } from 'viem'

export function toHex(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}

export async function sendTransaction(operate, data) {
  const _operate = capitalize(operate === 'broadcast' ? 'post' : operate)
  dispatch(setSubmitModalParam({
    open: true, type: _operate, state: 'pending'
  }))
  const dataJson = `SocialMint:${JSON.stringify({
    op: operate,
    info: data
  })}`;
  const dataHex = "0x" + toHex(dataJson);
  try {
    const hashData = await sendTransactionWagmi({
      to: VGodAddr,
      value: 0,
      data: dataHex
    })
    dispatch(setSubmitModalParam({ state: 'submitted', hash: hashData.hash }))
    console.log('hashData', hashData)
    const receipt = await waitForTransaction(hashData);
    dispatch(setSubmitModalParam({ state: receipt.status ? 'success' : 'failed' }))
    hashNotify(hashData.hash, receipt.status ? 'success' : 'failed')
    console.log('receipt', receipt)
  } catch (err) {
    console.log('error', err)
    if (err?.cause?.code === 4001) {
      dispatch(setSubmitModalParam({ open: false }))
    } else {
      dispatch(setSubmitModalParam({ state: 'failed' }))
    }
    return Promise.reject(err?.cause?.shortMessage)
  }
}


// 获取当前的 gasPrice
const getGasPrice = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const gasPrice = await provider.getGasPrice();
    return parseGwei(ethers.utils.formatUnits(gasPrice, 'gwei'));
  } else {
    throw new Error('No Ethereum provider detected. Install MetaMask or another wallet.');
  }
};

export async function writeContract(operate, param) {
  const _operate = capitalize(operate === 'broadcast' ? 'post' : operate);

  try {
    const gasPrice = await getGasPrice(); // 获取当前的 gasPrice
    console.log('gasPrice', gasPrice);
    console.log("param", param);
    const hashData = await writeContractWagmi({ ...param, gasPrice }); // 设置 gasPrice
    dispatch(setSubmitModalParam({ type: _operate, state: 'submitted', hash: hashData.hash }));
    console.log('hashData', hashData);
    const receipt = await waitForTransaction(hashData);
    dispatch(setSubmitModalParam({ state: receipt.status ? 'success' : 'failed' }));
    hashNotify(hashData.hash, receipt.status ? 'success' : 'failed');
    console.log('receipt', receipt);
  } catch (err) {
    console.log('error', err);
    if (err?.cause?.code === 4001) {
      dispatch(setSubmitModalParam({ open: false }));
    } else {
      dispatch(setSubmitModalParam({ state: 'failed' }));
    }
    return Promise.reject(err?.cause?.shortMessage);
  }
}
