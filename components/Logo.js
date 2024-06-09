import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import LogoIcon from '@icons/logo.png';
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '38px',
    // paddingLeft: '16px',
    fontWeight: '500',
    fontSize: '24px',
    color: '#142528',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  logo: {
    width: '32px',
    height: '30px',
    marginRight: '8px',
    flexShrink: 0,
  },
  title: {
    height: '100%',
    lineHeight: '38px',
    fontFamily: 'Poppins-SemiBold',
    fontSize: '20px',
    color: '#FFFFFF',
    letterSpacing: 0,
    fontWeight: '600',
  },
  close: {
    position: 'absolute',
    right: '20px',
    top: '30px',
    width: '26px',
    height: '26px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  drawerLogo: {
    display: 'flex',
    alignItems: 'center',
    width: '240px',
    height: '40px',
    fontSize: '24px',
    fontWeight: '500',
    color: '#142528'
  },
  drawerLogoIcon: {
    width: '40px',
    height: '40px',
    marginRight: '6px',
  },
}));

export default function Logo() {
  const classes = useStyles();
  const router = useRouter()
  const [drawer, setDrawer] = useState(false)

  const handleDrawer = () => setDrawer(true)
  const onClose = (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }
    setDrawer(false)
  }
  const jumpToIntroduce = (e) => {
    e.preventDefault()
    router.push('/')
  }

  return (
    <div className={classes.root} onClick={jumpToIntroduce}>
      {/* <img className={classes.logo} src={LogoIcon.src} /> */}
      <div className={classes.title}>Nft Lottery</div>
      {/* <Drawer
        anchor={'left'}
        open={drawer}
        onClose={onClose}
      >
        <div className={classes.close} onClick={onClose}><Close /></div>
        <div className={classes.drawerLogo}>
        </div>
      </Drawer> */}
    </div>
  );
}
