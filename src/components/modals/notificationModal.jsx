import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../redux/features/notificationModalSlice";
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
export default function NotificationModal() {
  const dispatch = useDispatch();

  const { modalOpen, message } = useSelector(
    (state) => state.notificationModal
  );

  const handleClose = () => {
    // close modal
    dispatch(closeModal());
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
