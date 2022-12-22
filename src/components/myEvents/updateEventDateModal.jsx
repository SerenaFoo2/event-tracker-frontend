import { useContext } from "react";
import httpStatus from "http-status";
import { AuthContext } from "../../context/authContext";
import { AllEventsContext } from "../../context/allEventsContext";
import { NotificationModalContext } from "../../context/notificationModalContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { EventTextBody, EventTitle } from "../../styles/featuredEvents";

export default function UpdateEventDateModal({
  modalOpen,
  changeInfo,
  setNewEventDates,
}) {
  const { event, oldEvent, revert } = changeInfo;

  const { axiosJWT } = useContext(AuthContext);
  const { allEvents, setAllEvents } = useContext(AllEventsContext);
  const { setNotificationModal } = useContext(NotificationModalContext);

  const handleClose = () => {
    // close modal.
    setNewEventDates((prev) => {
      return { ...prev, modalOpen: false };
    });
    revert();
  };

  /* update selected event with new dates to users/:id db. 
      - close modal.
      - update selected event with new dates to db.
      - update selected event with new dates to local allEvents
  */
  const handleUpdateEventDates = async () => {
    // close modal.
    setNewEventDates((prev) => {
      return { ...prev, modalOpen: false };
    });

    const newStartDate = event.startStr;
    const newEndDate = event.endStr;

    //get selectedEvent_id
    const eventObj = event.toPlainObject(); //convert to plain obj
    const selectedEvent_id = eventObj.extendedProps._id;

    try {
      // update selected event's new dates to local userInfo.savedEvents
      const newAllEvents = allEvents.map((event) => {
        if (event._id === selectedEvent_id) {
          //
          return { ...event, start: newStartDate, end: newEndDate };
        }
        return event;
      });

      // update newAllEventsIds to events/:id db
      const response = await axiosJWT.put(
        `${process.env.REACT_APP_API_URL}/events/${selectedEvent_id}`,
        { start: newStartDate, end: newEndDate }
      );

      if (response.status === httpStatus.OK) {
        setAllEvents(newAllEvents);

        setNotificationModal((prev) => {
          return {
            ...prev,
            modalOpen: true,
            message: `New dates for "${event.title}" has been updated succesfully.`,
          };
        });

        return;
      }
      // any other error
      throw Error("something is wrong with `handleUpdateEventDates`.");
    } catch (err) {
      console.log(err);
    }
  };

  function DisplayEventContent() {
    return (
      <>
        <EventTextBody>
          Update event date from:
          <br></br>
          &nbsp;&nbsp;start = {oldEvent.startStr}
          <br></br>
          &nbsp;&nbsp;end&nbsp;&nbsp; = {oldEvent.endStr}
          <br></br>
          <br></br>
          to new date: <br></br>
          &nbsp;&nbsp;start = {event.startStr}
          <br></br>
          &nbsp;&nbsp;end&nbsp;&nbsp; = {event.endStr}
          <br></br>
        </EventTextBody>
      </>
    );
  }

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <EventTitle>{event.title}</EventTitle>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {DisplayEventContent()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateEventDates}>Update Event</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
