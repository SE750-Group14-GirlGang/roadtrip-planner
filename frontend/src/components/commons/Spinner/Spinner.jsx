import { CircularProgress, withStyles } from '@material-ui/core';

const Spinner = withStyles(() => ({
  colorPrimary: {
    color: '#f76c6c',
  },
}))(CircularProgress);

export default Spinner;
