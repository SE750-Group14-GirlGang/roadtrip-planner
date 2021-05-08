import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    margin: 5,
    backgroundColor: '#24305e',
    border: 'none',
    '&:hover': {
      backgroundColor: '#374785',
    },
  },
  label: {
    color: 'white',
  },
}));

export default useStyles;
