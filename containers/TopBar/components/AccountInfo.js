import { makeStyles, capitalize } from '@material-ui/core';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { Button, ButtonIcon, Modal, Copy, External } from '@lidofinance/lido-ui';
import { useSelector } from 'react-redux';
import AddressBadgeAlt from '@components/AddressBadgeAlt';
import { useCopyToClipboard } from '@hooks/useCopyToClipboard';
import { selectAccountModalOpen, setAccountModalOpen } from '@store/ui';
import { dispatch } from '@store/index';
import { useDisconnect } from 'wagmi';
import { getHostByNet } from '@utils/index';
import { readContract } from '@wagmi/core'
import { LotteryContractConfig } from '@config/constants'
import { ethers } from 'ethers';
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  box: {
    // background: '#F4F6F8',
    borderRadius: '10px',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '4px'
  },
  account: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  connected: {
    color: '#7a8aa0',
    fontSize: '12px',
    lineHeight: '1.4em',
    flexGrow: '1',
    paddingRight: '16px',
    margin: '8px auto 8px 0',
  },
  disconnect: {
    padding: '10px 16px !important'
  },
  actions: {
    margin: '16px -8px 0px'
  },
  action: {
    justifySelf: 'start',
    padding: '0px',
    '&:hover': {
      background: 'unset',
    },
    '&& span': {
      color: '#00A3FF',
    },
  },
}));

function AccountInfo({ wallet }) {
  const classes = useStyles();
  const { disconnect } = useDisconnect();
  const { address, walletType } = wallet;
  const open = useSelector(selectAccountModalOpen)
  const handleCopy = useCopyToClipboard(address ?? '');
  const selectedNetwork = useSelector((state) => state.user.selectedNetwork);
  const EXPLORER_HOST = useMemo(() => getHostByNet(selectedNetwork), [selectedNetwork])
  const handleEtherscan = useCallback(() => {
    window.open(`${EXPLORER_HOST}/address/${address}`)
  }, [])

  const handleClose = useCallback(() => {
    dispatch(setAccountModalOpen(false))
  }, [])

  const handleDisconnect = useCallback(() => {
    disconnect()
    dispatch(setAccountModalOpen(false))
  }, [])

  const [nftToken, setNftToken] = useState('');
  const tokenOfOwnerByIndex = async () => {
    const res = await readContract({
      ...LotteryContractConfig,
      functionName: 'tokenOfOwnerByIndex',
      args: [address, ethers.BigNumber.from(0)]
    });
    console.log(res);
    setNftToken(res.toString());
  };
  useEffect(() => {
    address && tokenOfOwnerByIndex();
  }, [address]);

  const router = useRouter()
  const goDetail = () => {
    router.push('/my-nft');
  }

  return (
    <Modal open={open} title={'Account'} onClose={handleClose}>
      <div className={classes.box}>
        <div className='flex flex-1 mb-1'>
          <ButtonIcon
            onClick={(goDetail)}
            icon={<External />}
            size="xs"
            variant="ghost"
          >
            my token: {nftToken}
          </ButtonIcon>
        </div>
        <div className={classes.account}>
          <Button
            className={classes.disconnect}
            size="xs"
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
          <div className={classes.connected}>
            Connected with {capitalize(walletType || '')}
          </div>
        </div>
        <AddressBadgeAlt address={address} mode='light' />
        <div className={classes.actions}>
          <ButtonIcon
            onClick={handleCopy}
            icon={<Copy />}
            size="xs"
            variant="ghost"
          >
            copy Address
          </ButtonIcon>
          <ButtonIcon
            onClick={(handleEtherscan)}
            icon={<External />}
            size="xs"
            variant="ghost"
          >
            Explorer
          </ButtonIcon>
        </div>
      </div>
    </Modal >
  );
}

export default AccountInfo;
