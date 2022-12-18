import { useContext } from "react";
import httpStatus from "http-status";
import { AuthContext } from "../../context/authContext";
import { UserContext } from "../../context/userContext";
import { AllEventsContext } from "../../context/allEventsContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function RemoveEventModal({
  modalOpen,
  event,
  setSelectedEvent,
}) {
  const { axiosJWT } = useContext(AuthContext);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { allEvents, setAllEvents } = useContext(AllEventsContext);

  const handleClose = () => {
    // close modal.
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: false };
    });
  };

  /* remove selected event from calender and users/:id db. 
      - close modal.
      - newSavedEvents: filtered selected event from savedEvents.
      - newSavedEventsIds: mapped newSavedEvents to array of ids string.
      - axiosJWT.put: update newSavedEventsIds to users/:id db
  */
  const handleRemoveEvent = async () => {
    // close modal.
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: false };
    });

    // remove selectedEvent_id from savedEvents
    const eventObj = event.toPlainObject(); //convert to plain obj
    const selectedEvent_id = eventObj.extendedProps._id;
    const newSavedEvents = userInfo.savedEvents.filter((event) => {
      return event._id !== selectedEvent_id;
    });

    // map newSavedEvents to an array of ids string
    const newSavedEventsIds = newSavedEvents.map((event) => {
      return event._id;
    });

    // update newSavedEventsIds to users/:id db
    try {
      const response = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/users/${userInfo.id}`,
        { savedEvents: newSavedEventsIds }
      );

      const { status, statusText } = response;
      if (status === httpStatus.OK) {
        setUserInfo((prev) => {
          return { ...prev, savedEvents: newSavedEvents };
        });
        return;
      }

      //TODO if Admin, delete selected event And all users holding that event.
      // any other errors
      throw Error(`${statusText}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{event.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Remove this event from " +
              (userInfo.role === "admin"
                ? `database and users' saved events?`
                : `your calender?`)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemoveEvent}>Remove Event</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
