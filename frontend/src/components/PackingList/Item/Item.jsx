import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styles from './Item.module.css';
import { useStyles, CustomCheckbox } from './Item.styles';

export default function Item({ name, checked, onChange }) {
  const classes = useStyles();

  return (
    <div className={`${styles.item} ${checked ? styles.checked : styles.unchecked}`}>
      <FormControlLabel
        className={checked ? classes.labelChecked : classes.labelUnchecked}
        control={<CustomCheckbox checked={checked} onChange={onChange} />}
        label={name}
      />
    </div>
  );
}
