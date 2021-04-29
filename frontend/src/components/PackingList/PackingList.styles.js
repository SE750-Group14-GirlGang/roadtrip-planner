import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  button: {
    color: 'white',
    textTransform: 'none',
    backgroundColor: '#24305e',
    '&:hover': {
      backgroundColor: '#374785',
    },
  },
}));

export default useStyles;
