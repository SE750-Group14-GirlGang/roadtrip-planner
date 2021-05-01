import { Button } from '@material-ui/core';
import useStyles from './AddButton.styles';

export default function AddButton(props) {
  const classes = useStyles();

  return <Button classes={classes} {...props} />;
}
