import { TableCell, TableRow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#24305e',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const CustomTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export { CustomTableCell, CustomTableRow };
