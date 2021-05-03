import { AppBar, withStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  grow: {
    flexGrow: 1,
  },
}));

const CustomTopBar = withStyles({
  root: {
    boxShadow: 'none',
    backgroundColor: 'white',
  },
})(AppBar);

export { CustomTopBar, useStyles };
