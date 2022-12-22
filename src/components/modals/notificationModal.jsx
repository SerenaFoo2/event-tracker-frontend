import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { EventTextBody, EventTitle } from "../../styles/featuredEvents";

/* Global notification Modal for generic use */
export default function NotificationModal({
  modalOpen,
  message,
  setNotification,
}) {
  const handleClose = () => {
    // close modal.
    setNotification((prev) => {
      return { ...prev, modalOpen: false };
    });
  };

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <EventTitle> {"Notification"}</EventTitle>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <EventTextBody>{message}</EventTextBody>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
