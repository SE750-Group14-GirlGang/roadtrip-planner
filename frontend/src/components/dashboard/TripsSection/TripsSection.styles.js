import { CircularProgress, withStyles } from '@material-ui/core';

const CustomCircularProgress = withStyles(() => ({
  colorPrimary: {
    color: '#f76c6c',
  },
}))(CircularProgress);

export default CustomCircularProgress;
