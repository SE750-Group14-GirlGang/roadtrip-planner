import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const ResizableIconButton = ({ classes, size, ...props }) => <IconButton className={classes[size]} {...props} />;

const styles = {
  small: {
    '& svg': {
      fontSize: 18,
      color: '#24305e',
      '&:hover': {
        color: '#374785',
      },
    },
  },
  medium: {
    '& svg': {
      fontSize: 26,
      color: '#24305e',
      '&:hover': {
        color: '#374785',
      },
    },
  },
  large: {
    '& svg': {
      fontSize: 34,
      color: '#24305e',
      '&:hover': {
        color: '#374785',
      },
    },
  },
};

export default withStyles(styles)(ResizableIconButton);
