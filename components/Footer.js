import { makeStyles } from '@material-ui/core';
import Tooltip from '@components/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50px',
    background: '#00000000',
    borderTop: '1px solid rgba(8, 14, 20, 0.1)',
  },
  logo: {
    display: 'inline-block',
    lineHeight: '24px',
    width: '24px',
    height: '24px',
    marginRight: '10px'
  },
  link: {
    marginLeft: '10px',
    textDecoration: 'none',
    color: '#07a658'
  },
  beta: {
    display: 'inline-block',
    color: '#fff',
    marginLeft: '10px',
    padding: '2px 6px',
    borderRadius: '6px',
    background: '#07A658',
    cursor: 'pointer'
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <span className={classes.text}>
        Powered by Social mint
        <Tooltip title="v2.3.3" placement='top'>
          <div className={classes.beta}>Beta</div>
        </Tooltip>
      </span>
    </div>
  );
}
