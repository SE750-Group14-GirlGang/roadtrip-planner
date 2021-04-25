import React from "react";
import styles from "./Item.module.css";
import { useStyles } from "./Item.Styles";
import { withStyles } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const CustomCheckbox = withStyles({
    root: {
        color: "#24305e",
        "&$checked": {
            color: "grey",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Item({ name, checked, onChange }) {
    const classes = useStyles();

    return (
        <div
            className={`${styles.item} ${
                checked ? styles.checked : styles.unchecked
            }`}
        >
            <FormControlLabel
                className={
                    checked ? classes.labelChecked : classes.labelUnchecked
                }
                control={
                    <CustomCheckbox checked={checked} onChange={onChange} />
                }
                label={name}
            />
        </div>
    );
}
