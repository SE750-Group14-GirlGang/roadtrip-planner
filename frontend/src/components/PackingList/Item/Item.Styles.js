import { makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";

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

export { useStyles, CustomCheckbox };
