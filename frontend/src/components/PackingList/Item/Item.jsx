import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import styles from "./Item.module.css";

export default function Item({ name, checked, onChange }) {
    return (
        <div
            className={`${styles.item} ${
                checked ? styles.checked : styles.unchecked
            }`}
        >
            <FormControlLabel
                control={
                    <Checkbox
                        color="default"
                        checked={checked}
                        onChange={onChange}
                    />
                }
                label={name}
            />
        </div>
    );
}
