import { makeStyles } from '@material-ui/core';
import Etherscan from '@icons/Etherscan.svg';
import Twitter from '@icons/Twitter.svg';
import Warpcaster from '@icons/Warpcaster.svg';
import { last } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    background: "#fff",
    height: "70px",
    borderTop: "1px solid #e5e5e5",
  },
  beta: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
    marginLeft: "10px",
    padding: "10px 16px",
    borderRadius: "12px",
    background: "#F7F7F7",
    cursor: "pointer",
    fontSize: "14px",
    color: "#151515",
    letterSpacing: "0",
    textAlign: "center",
    lineHeight: "16px",
    fontWeight: "700",
    // last-child margin-right: 0
    "&:last-child": {
      marginRight: "0",
    },
    // media max 640px no padding
    [theme.breakpoints.down("sm")]: {
      padding: "0",
    },
  },
  icon: {
    width: "24px",
    height: "20px",
    marginRight: "8px",
  },
  text: {
    // media max 640px display none
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.beta}>
        <Etherscan className={classes.icon} />
        <span className={classes.text}>Etherscan</span>
      </div>
      <div className={classes.beta}>
        <Twitter className={classes.icon} />
        <span className={classes.text}>Twitter</span>
      </div>
      <div className={classes.beta}>
        <Warpcaster className={classes.icon} />
        <span className={classes.text}>Warpcaster</span>
      </div>
    </div>
  );
}
