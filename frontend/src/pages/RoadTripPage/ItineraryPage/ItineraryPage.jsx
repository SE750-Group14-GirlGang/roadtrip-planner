import { React, useState} from "react";
import { Button, withStyles } from "@material-ui/core";
import DateRangePickerModal from "../../../components/itinerary/DateRangePickerModal/DateRangePickerModal";
import styles from "./ItineraryPage.module.css";


export default function ItineraryPage() {
  const [modalOpen, setModalOpen] = useState(false);
  // TODO: use getRequest()
  const  [datesSelected, setDatesSelected] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const AddDatesButton = withStyles({
    root: {
      backgroundColor: "#24305e",
      border: "none",
      "&:hover": {
        backgroundColor: "#374785",
      },
    },
    label: {
      color: "white",
    },
  })(Button);

  return (
    <div className={styles.itineraryPage}>
      <p className={styles.itineraryPageTitle}>Itinerary</p>
      {datesSelected ? (
        <div>An actual itinerary</div>
      ) : (
        <div>
          <p className={styles.emptyItineraryPageDescription}>
            The organiser has not entered dates for the road trip yet!
          </p>
          <br />
          <AddDatesButton onClick={handleOpenModal}>
            Add Dates
          </AddDatesButton>
          <DateRangePickerModal open={modalOpen} handleClose={handleCloseModal} setDatesSelected={setDatesSelected}></DateRangePickerModal>
        </div>
      )}
    </div>
  );  
}
