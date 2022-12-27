import { useState, useContext } from "react";
import FavouriteEventModal from "./favouriteEventModal";
import { UserContext } from "../../context/userContext";
import { EventDetailsModalContext } from "../../context/eventDetailsModalContext";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardTitle, CardText } from "../../styles/featuredEvents";

export default function ImgMediaCard({ event }) {
  const { title, image_urls, start, end, location } = event;

  // use in <RemoveEventModal>
  const defaultSelectedEvent = {
    event: {},
    modalOpen: false,
    ADDOrREMOVE: "", //"ADD" or "REMOVE"
  };

  const [selectedEvent, setSelectedEvent] = useState(defaultSelectedEvent);

  const { userInfo } = useContext(UserContext);
  const { setEventDetailsModal } = useContext(EventDetailsModalContext);

  function handleClickLearnMore() {
    setEventDetailsModal((prev) => {
      return {
        ...prev,
        modalOpen: true,
        event: event,
      };
    });
  }

  /* open modal by:
      - update "setSelectedEvent" and pass in all other information.  */
  function handleClickAddEvent() {
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: true, event: event, ADDOrREMOVE: "ADD" };
    });
  }

  /* open modal by:
      - update "setSelectedEvent" and pass in all other information.  */
  function handleClickRemoveEvent() {
    console.log("handleClickRemoveEvent");
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: true, event: event, ADDOrREMOVE: "REMOVE" };
    });
  }

  /* Check if this event part of userInfo.savedEvents:
      - if yes, show <FavoriteIcon />
      - if no, show <FavoriteBorderIcon />  */
  function displayFavoriteButton() {
    let iconComponent = "";

    const userSavedEventsIds = userInfo.savedEvents.map((event) => event._id);
    const isUserEvent = userSavedEventsIds.includes(event._id) ? true : false;

    if (isUserEvent) {
      iconComponent = <FavoriteIcon onClick={handleClickRemoveEvent} />;
    } else {
      iconComponent = <FavoriteBorderIcon onClick={handleClickAddEvent} />;
    }

    return <Button size="small">{iconComponent}</Button>;
  }

  /* format given dateTimeISO string 
      - into a specified dateTime formatted string (e.g. Tue, 13 Dec 2022, 6:00 pm). */
  function formatDateTime(dateISOstring) {
    const dateTimeDisplayOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Intl.DateTimeFormat(
      navigator.language,
      dateTimeDisplayOptions
    ).format(new Date(dateISOstring));
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
      mx={2}
    >
      <FavouriteEventModal
        modalOpen={selectedEvent.modalOpen}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />

      <Card sx={{ width: { xs: "300px", lg: "350px" } }}>
        <CardMedia
          component="img"
          alt={title}
          height="160px"
          sx={{ height: { md: "140px", lg: "160px" } }}
          image={image_urls}
        />
        <CardContent sx={{ paddingY: 1 }}>
          <CardTitle>{title}</CardTitle>
          <CardText>
            {`${formatDateTime(start)} - ${formatDateTime(end)}`}
            <br></br>
            {location}
          </CardText>
        </CardContent>
        <CardActions sx={{ paddingTop: 0, paddingX: 1.5 }}>
          {userInfo.role === "user" ? displayFavoriteButton() : ""}
          <Button size="small" onClick={handleClickLearnMore}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
