import { useContext } from "react";
import httpStatus from "http-status";
import { AuthContext } from "../../context/authContext";
import { UserContext } from "../../context/userContext";
import { AllEventsContext } from "../../context/allEventsContext";
import { NotificationModalContext } from "../../context/notificationModalContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { EventTextBody, EventTitle } from "../../styles/featuredEvents";

export default function RemoveEventModal({
  modalOpen,
  event,
  setSelectedEvent,
}) {
  const { axiosJWT } = useContext(AuthContext);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { allEvents, setAllEvents } = useContext(AllEventsContext);
  const { setNotificationModal } = useContext(NotificationModalContext);

  const handleClose = () => {
    // close modal.
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: false };
    });
  };

  /* remove selected event from calender and users/:id db. 
      - close modal.
      - if role = "user", 
          - delete selectedEvent_id from users.savedEvents in db. 
          - update userInfo
      - if role = "admin", 
          - delete selectedEvent_id from /events and all users.savedEvents in db.
          - update userInfo and allEvents.
  */
  const handleRemoveEvent = async () => {
    // close modal.
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: false };
    });

    // remove selectedEvent_id from savedEvents
    const eventObj = event.toPlainObject(); //convert to plain obj
    const selectedEvent_id = eventObj.extendedProps._id;

    try {
      /* if role: 
          - "user", delete selectedEvent_id from users.savedEvents in db.
          = "admin", delete selectedEvent_id from /events and all users.savedEvents in db.
      */
      if (userInfo.role !== "admin") {
        const newSavedEvents = userInfo.savedEvents.filter((event) => {
          return event._id !== selectedEvent_id;
        });

        // map newSavedEvents to an array of ids string
        const newSavedEventsIds = newSavedEvents.map((event) => {
          return event._id;
        });

        // update newSavedEventsIds to users/:id db
        const response = await axiosJWT.put(
          `${process.env.REACT_APP_API_URL}/users/${userInfo.id}`,
          { savedEvents: newSavedEventsIds }
        );

        if (response.status === httpStatus.OK) {
          setUserInfo((prev) => {
            return { ...prev, savedEvents: newSavedEvents };
          });

          setNotificationModal((prev) => {
            return {
              ...prev,
              modalOpen: true,
              message:
                "Event has been successfully removed from your calender!",
            };
          });
        }
        return;
      } else {
      }
      const response = await axiosJWT.delete(
        `${process.env.REACT_APP_API_URL}/events/${selectedEvent_id}`
      );
      if (response.status === httpStatus.OK) {
        // update setAllEvents
        const newAllEvents = allEvents.filter((event) => {
          return event._id !== selectedEvent_id;
        });
        setAllEvents(newAllEvents);

        // update setUserInfo
        const newSavedEvents = userInfo.savedEvents.filter((event) => {
          return event._id !== selectedEvent_id;
        });

        setUserInfo((prev) => {
          return { ...prev, savedEvents: newSavedEvents };
        });

        setNotificationModal((prev) => {
          return {
            ...prev,
            modalOpen: true,
            message: "Event has been successfully added into your calender!",
          };
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  function DisplayEventContent() {
    return (
      <EventTextBody>
        {"Remove this event from " +
          (userInfo.role === "admin"
            ? `database and users' saved events?`
            : `your calender?`)}
      </EventTextBody>
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
          <Button onClick={handleRemoveEvent}>Remove Event</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
