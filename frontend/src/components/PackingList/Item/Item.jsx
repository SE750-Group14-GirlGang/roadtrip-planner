import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles, withStyles } from "@material-ui/core";

import styles from "./Item.module.css";

const useStyles = makeStyles(() => ({
    labelUnchecked: {
        color: "#24305e",
    },
    labelChecked: {
        fontStyle: "italic",
        textDecoration: "line-through",
        color: "grey",
        opacity: "75%",
    },
}));

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
