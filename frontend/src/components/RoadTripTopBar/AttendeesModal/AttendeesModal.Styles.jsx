import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Button, DialogTitle, TextField, ListItemText, withStyles, DialogContent } from '@material-ui/core';

const AddAttendeeTextField = withStyles({
  root: {
    marginLeft: '3px',
    marginBottom: '8px',
  },
})(TextField);

const ActionButton = withStyles({
  root: {
    backgroundColor: '#24305e',
    border: 'none',
    '&:hover': {
      backgroundColor: '#374785',
    },
  },
  label: {
    color: 'white',
  },
})(Button);

const ColouredAccountIcon = withStyles({
  root: {
    color: '#24305e',
    '&:hover': {
      color: '#374785',
    },
    paddingRight: '15px',
    paddingLeft: '0px',
  },
})(AccountCircleIcon);

const ColouredListItemText = withStyles({
  root: {
    color: '#24305e',
    '&:hover': {
      color: '#374785',
    },
  },
})(ListItemText);

const ColouredDialogTitle = withStyles({
  root: {
    color: '#24305e',
    paddingBottom: '0px',
  },
})(DialogTitle);

const CustomDialogContent = withStyles({
  root: {
    paddingLeft: '10px',
  },
})(DialogContent);

export {
  AddAttendeeTextField,
  ActionButton,
  ColouredAccountIcon,
  ColouredListItemText,
  ColouredDialogTitle,
  CustomDialogContent,
};
