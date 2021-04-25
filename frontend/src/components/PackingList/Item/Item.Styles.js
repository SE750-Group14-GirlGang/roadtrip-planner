import { makeStyles } from "@material-ui/core";

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

export { useStyles };
