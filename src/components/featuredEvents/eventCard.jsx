import { useState, useContext } from "react";
import FavouriteEventModal from "./favouriteEventModal";
import { UserContext } from "../../context/userContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function ImgMediaCard({ event }) {
  const { title, image_urls } = event;

  // use in <RemoveEventModal>
  const defaultSelectedEvent = {
    event: {},
    modalOpen: false,
    ADDOrREMOVE: "", //"ADD" or "REMOVE"
  };

  const [selectedEvent, setSelectedEvent] = useState(defaultSelectedEvent);

  const { userInfo } = useContext(UserContext);

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

    return (
      <Button size="small" margin="right">
        {iconComponent}
      </Button>
    );
  }

  return (
    <>
      <FavouriteEventModal
        modalOpen={selectedEvent.modalOpen}
        event={selectedEvent.event}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={image_urls}
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
          {userInfo.role === "user" ? displayFavoriteButton() : ""}
        </CardActions>
      </Card>
    </>
  );
}
