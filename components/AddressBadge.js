import { makeStyles } from '@material-ui/core';
import { dispatch } from '@store/index';
import { setAccountModalOpen } from '@store/ui';
import { useCallback } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { addressShortened } from '@utils/index';
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: '100px',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px',
    cursor: 'pointer',
    '&& p': {
      lineHeight: '24px',
      margin: 0,
      marginLeft: '12px',
      marginRight: '6px',
    },
  },
  dark: {
    background: 'rgba(0, 0, 0, 0.2)',
    '&& p': {
      color: '#FFFFFF',
    },
  },
  light: {
    background: '#F4F6F8',
    '&& p': {
      color: '#5D6B7B',
    },
  },
}));

export default function AddressBadge({ address, mode }) {
  const classes = useStyles();
  const openAccountInfo = useCallback(() => {
    console.log(123);
    dispatch(setAccountModalOpen(true))
  }, [])

  return (
    <div className={`${classes.root} ${classes[mode || 'light']}`} onClick={openAccountInfo} >
      {!isMobile && <p>{addressShortened(address, 4, 4)}</p>}
      <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />
    </div>
  );
}
