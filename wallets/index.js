import { switchNetwork as switchNetworkWagmi } from "@wagmi/core";
import { SELECTED_NETWORK_LOCAL_STORAGE_KEY } from "@config/localStorage";

export async function switchNetwork(chainId, active) {
  if (active) {
    await switchNetworkWagmi({ chainId });
  } else {
    // chainId in localStorage allows to switch network even if wallet is not connected
    // or there is no wallet at all
    localStorage.setItem(SELECTED_NETWORK_LOCAL_STORAGE_KEY, String(chainId));
    document.location.reload();
    return;
  }
}

/**
 * 
 * @param {string} address 
 * @param {number} length 
 * @returns 
 */
export function shortenAddressOrEns(address, length) {
  if (!length) {
    return "";
  }
  if (!address) {
    return address;
  }
  if (address.length < 10) {
    return address;
  }
  let left = address.includes(".") ? address.split(".")[1].length : Math.floor((length - 3) / 2) + 1;
  return address.substring(0, left) + "..." + address.substring(address.length - (length - (left + 3)), address.length);
}
