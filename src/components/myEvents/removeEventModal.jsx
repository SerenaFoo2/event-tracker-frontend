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
  const handleClose = () => {
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: false };
    });
  };

  const handleRemoveEvent = () => {
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: false };
    });
    console.log("xx event is removed...");
    //TODO remove "event" from myEvents
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
            {`Remove this event from your calender?`}
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
