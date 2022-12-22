import { useState, useContext } from "react";
import FavouriteEventModal from "./favouriteEventModal";
import EventDetailsModal from "./eventDetailsModal";
import { UserContext } from "../../context/userContext";
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
import { CardTitle } from "../../styles/featuredEvents";

export default function ImgMediaCard({ event }) {
  const { title, image_urls } = event;

  // use in <RemoveEventModal>
  const defaultSelectedEvent = {
    event: {},
    modalOpen: false,
    ADDOrREMOVE: "", //"ADD" or "REMOVE"
  };

  // use in <EventDetailsModal>
  const defaultEventDetails = {
    event: {},
    modalOpen: false,
  };

  const [selectedEvent, setSelectedEvent] = useState(defaultSelectedEvent);
  const [eventDetails, setEventDetails] = useState(defaultEventDetails);

  const { userInfo } = useContext(UserContext);

  function handleClickLearnMore() {
    setEventDetails((prev) => {
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
    console.log("handleClickAddEvent");
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

      <EventDetailsModal
        modalOpen={eventDetails.modalOpen}
        eventDetails={eventDetails}
        setEventDetails={setEventDetails}
      />

      <Card sx={{ maxWidth: 300 }}>
        <CardMedia
          component="img"
          alt={title}
          height="140px"
          image={image_urls}
        />
        <CardContent sx={{ paddingY: 1 }}>
          <CardTitle>{title}</CardTitle>
        </CardContent>
        <CardActions sx={{ paddingTop: 0 }}>
          {userInfo.role === "user" ? displayFavoriteButton() : ""}
          <Button size="small" onClick={handleClickLearnMore}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
