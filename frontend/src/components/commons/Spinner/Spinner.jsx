import { CircularProgress, withStyles } from '@material-ui/core';

export const Spinner = withStyles(() => ({
  colorPrimary: {
    color: '#f76c6c',
  },
}))(CircularProgress);

export default Spinner;
