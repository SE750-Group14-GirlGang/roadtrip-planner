import { AppBar, withStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

const CustomTopBar = withStyles({
  root: {
    backgroundColor: 'white',
    boxShadow: 'none',
  },
})(AppBar);

export { useStyles, CustomTopBar };
