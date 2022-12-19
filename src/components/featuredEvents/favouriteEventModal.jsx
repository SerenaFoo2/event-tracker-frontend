import { useContext } from "react";
import httpStatus from "http-status";
import { AuthContext } from "../../context/authContext";
import { UserContext } from "../../context/userContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FavouriteEventModal({
  modalOpen,
  event,
  selectedEvent,
  setSelectedEvent,
}) {
  const { axiosJWT } = useContext(AuthContext);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleClose = () => {
    // close modal.
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: false };
    });
  };

  //! update this later
  /* Remove selected event from calender and users/:id db:
      - close modal.
      - delete selectedEvent_id from users.savedEvents in db. 
      - update userInfo  */
  async function handleClickRemoveEvent() {
    // close modal.
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: false };
    });

    // if event had already been favorited, remove event from db.
    const selectedEvent_id = event._id;
    const newSavedEvents = userInfo.savedEvents.filter((event) => {
      return event._id !== selectedEvent_id;
    });

    try {
      // update newSavedEvents to users/:id db
      const response = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/users/${userInfo.id}`,
        { savedEvents: newSavedEvents }
      );
      if (response.status === httpStatus.OK) {
        setUserInfo((prev) => {
          return { ...prev, savedEvents: newSavedEvents };
        });
        alert("remove event from user SUCCESS!");
        return;
      }

      //any other error
      throw Error("Something is wrong, not able to remove event.");
    } catch (err) {
      console.log(err);
    }
  }

  /* Add selected event from calender and users/:id db:
      - close modal.
      - add selectedEvent_id from users.savedEvents in db. 
      - update userInfo  */
  async function handleClickAddEvent() {
    // close modal.
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: false };
    });

    // push new event to "userInfo.savedEvents"
    const newSavedEvents = userInfo.savedEvents.slice();
    newSavedEvents.push(event);

    try {
      // update newSavedEvents to users/:id db
      const response = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/users/${userInfo.id}`,
        { savedEvents: newSavedEvents }
      );

      if (response.status === httpStatus.OK) {
        setUserInfo((prev) => {
          return { ...prev, savedEvents: newSavedEvents };
        });
        alert("add event to user SUCCESS!");
        return;
      }
      //any other error
      throw Error("Something is wrong, not able to add event.");
    } catch (err) {
      console.log(err);
    }
  }

  const { ADDOrREMOVE } = selectedEvent;
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
            {`${
              ADDOrREMOVE === "ADD"
                ? "Add this event to"
                : "Remove this event from"
            } your calender?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={
              ADDOrREMOVE === "ADD"
                ? handleClickAddEvent
                : handleClickRemoveEvent
            }
          >
            {`${ADDOrREMOVE === "ADD" ? "Add" : "Remove"} Event`}
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
