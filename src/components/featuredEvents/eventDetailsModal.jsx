import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  EventTitle,
  EventDetailsHeader,
  EventDetailsBody,
} from "../../styles/featuredEvents";

export default function EventDetailsModal({
  modalOpen,
  eventDetails,
  setEventDetails,
}) {
  const { event } = eventDetails;

  const handleClose = () => {
    // close modal.
    setEventDetails((prev) => {
      return { ...prev, modalOpen: false };
    });
  };

  /*Display event full details */
  function DisplayEventContent() {
    return (
      <>
        <br />
        <EventDetailsHeader>
          {"Date/Time:"} <br />
        </EventDetailsHeader>
        <EventDetailsBody>
          &nbsp; &nbsp;{`Start: ${new Date(event.start).toLocaleString()}`}
          <br />
          &nbsp; &nbsp;{`End: ${new Date(event.end).toLocaleString()}`}
          <br />
        </EventDetailsBody>
        <EventDetailsHeader>{"Location: "}</EventDetailsHeader>
        <EventDetailsBody>
          {`${event.location}`} <br />
        </EventDetailsBody>
        <EventDetailsHeader>{"Arts_groups: "}</EventDetailsHeader>
        <EventDetailsBody>
          {`${event.arts_groups}`} <br />
        </EventDetailsBody>
        <EventDetailsHeader>{"Price(SGD): "}</EventDetailsHeader>
        <EventDetailsBody>
          {`$${event.price}`} <br />
        </EventDetailsBody>
        <EventDetailsHeader>{"Description: "}</EventDetailsHeader>
        <EventDetailsBody>
          {`${event.description}`} <br />
        </EventDetailsBody>
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
          <img src={event.image_urls} alt={event.title} height={250} />
          <DialogContentText id="alert-dialog-description">
            {DisplayEventContent()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
