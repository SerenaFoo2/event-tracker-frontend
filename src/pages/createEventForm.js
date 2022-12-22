import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { AllEventsContext } from "../context/allEventsContext";
import httpStatus from "http-status";
import { NotificationModalContext } from "../context/notificationModalContext";
import { TextField, Button, Typography, Stack, Box } from "@mui/material";
import { FooterText } from "../styles/signUp";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function CreateEventForm() {
  const { axiosJWT } = useContext(AuthContext);
  const { setAllEvents } = useContext(AllEventsContext);
  const { setNotificationModal } = useContext(NotificationModalContext);

  const inputInforDefault = {
    title: "new event title",
    start: new Date().toDateString(),
    end: new Date().toDateString(),
    location: "Malaysia",
    description: "for social",
    image_urls:
      "https://cdn.eventfinda.sg/uploads/events/transformed/49182-23629-34.jpg?v=2",
    arts_groups: "Vivocity",
    price: "0",
    is_featured: false,
  };
  const errorDefault = "";

  const [inputInfor, setInputInfor] = useState(inputInforDefault);
  const [error, setError] = useState(errorDefault);

  const navigate = useNavigate();

  /* handleSubmitCreateEvent:
      - if input infor do not conflict with db, store to db, 
        update allEvents, then navigate to /myEvents.
      - else show error.  
  */
  async function handleSubmitCreateEvent(e) {
    e.preventDefault();

    if (error) {
      return;
    }
    //reset error
    setError(errorDefault);

    //send to db
    try {
      const response = await axiosJWT.post(
        `${process.env.REACT_APP_API_URL}/events`,
        inputInfor
      );
      const { status, statusText, data } = response;

      if (status === httpStatus.CREATED) {
        setInputInfor(inputInforDefault);

        // update local AllEvents
        setAllEvents((prev) => {
          return [...prev, data];
        });

        setNotificationModal((prev) => {
          return {
            ...prev,
            modalOpen: true,
            message: "New event has been created successfully!",
          };
        });
        return navigate("/myEvents");
      }

      throw Error(`${statusText}`);
    } catch (err) {
      if (err.response) {
        const { status, statusText, data } = err.response;
        switch (status) {
          case httpStatus.CONFLICT:
            setError(`${data}`);
            break;
          default:
            setError(`${statusText}.`);
            break;
        }
        return;
      }

      return setError(`${err}`);
    }
  }

  const handleInputsChange = (e) => {
    const name = e.target.name;

    //clear error
    setError(errorDefault);

    if (name === "is_featured") {
      setInputInfor((prev) => {
        return { ...prev, [name]: e.target.checked };
      });
      return;
    }

    //update inputInfor
    setInputInfor((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };

  return (
    <div>
      <Box sx={{ textAlign: "center" }} pt={4}>
        <Typography variant="h6">Create New Event</Typography>
      </Box>
      <Stack justifyContent="center" alignItems="center">
        <Box
          component="form"
          onSubmit={(e) => {
            handleSubmitCreateEvent(e);
          }}
        >
          <Stack spacing={2} p={3} sx={{ width: 250 }}>
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              size="small"
              type="text"
              label="Title"
              variant="outlined"
              name="title"
              value={inputInfor.title}
              required
              onChange={(e) => {
                handleInputsChange(e);
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                inputProps={{ style: { fontSize: 14 } }}
                renderInput={(props) => (
                  <TextField
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    size="small"
                    name="start"
                    {...props}
                  />
                )}
                label="Start Date/Time"
                value={inputInfor.start}
                onChange={(newValue) => {
                  setError(errorDefault);
                  setInputInfor((prev) => {
                    if (prev.end) {
                      const newStart = new Date(
                        newValue.toISOString()
                      ).getTime();
                      const prevEnd = new Date(prev.end).getTime();

                      if (prevEnd - newStart < 0) {
                        setError(
                          "End Date/Time should be after Start Date/Time."
                        );
                      }
                      return { ...prev, start: newValue.toISOString() };
                    }
                    return prev;
                  });
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                inputProps={{ style: { fontSize: 14 } }}
                renderInput={(props) => (
                  <TextField
                    InputLabelProps={{ style: { fontSize: 14 } }}
                    size="small"
                    name="end"
                    required
                    {...props}
                  />
                )}
                label="End Date/Time"
                value={inputInfor.end}
                onChange={(newValue) => {
                  setError(errorDefault);
                  setInputInfor((prev) => {
                    if (prev.start) {
                      const prevStart = new Date(prev.start).getTime();
                      const newEnd = new Date(newValue.toISOString()).getTime();

                      if (newEnd - prevStart < 0) {
                        setError(
                          "End Date/Time should be after Start Date/Time."
                        );
                      }
                      return { ...prev, end: newValue.toISOString() };
                    }
                    return prev;
                  });
                }}
              />
            </LocalizationProvider>
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              size="small"
              type="text"
              label="Location"
              variant="outlined"
              name="location"
              value={inputInfor.location}
              required
              onChange={(e) => {
                handleInputsChange(e);
              }}
            />
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              size="small"
              type="text"
              label="Description"
              variant="outlined"
              name="description"
              value={inputInfor.description}
              required
              onChange={(e) => {
                handleInputsChange(e);
              }}
            />
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              size="small"
              type="text"
              label="Image URL"
              variant="outlined"
              name="image_urls"
              value={inputInfor.image_urls}
              required
              onChange={(e) => {
                handleInputsChange(e);
              }}
            />
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              size="small"
              type="text"
              label="Arts Group"
              variant="outlined"
              name="arts_groups"
              value={inputInfor.arts_groups}
              required
              onChange={(e) => {
                handleInputsChange(e);
              }}
            />
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              size="small"
              type="number"
              label="Price ($SGD)"
              variant="outlined"
              name="price"
              value={inputInfor.price}
              required
              onChange={(e) => {
                handleInputsChange(e);
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={inputInfor.is_featured}
                  onChange={(e) => {
                    handleInputsChange(e);
                  }}
                  inputProps={{ "aria-label": "is_featured" }}
                  name="is_featured"
                />
              }
              sx={{ "& .MuiFormControlLabel-label": { fontSize: "14px" } }}
              label="Is featured?"
            />
            <Button variant="contained" type="submit" size="small">
              CREATE
            </Button>
            {error && <FooterText sx={{ color: "red" }}>{error}</FooterText>}
          </Stack>
        </Box>

        <Stack spacing={2} sx={{ width: 250 }}>
          <FooterText sx={{ textAlign: "left" }}>
            <Link to="/myEvents">Return to My Events Page </Link>
          </FooterText>
        </Stack>
      </Stack>
    </div>
  );
}
