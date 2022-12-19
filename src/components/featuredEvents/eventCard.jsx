import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AllEventsContext } from "../../context/allEventsContext";
import { useContext } from "react";

export default function EventCard({ img, title }) {
  const { allEvents, setAllEvents } = useContext(AllEventsContext);
  console.log(img, title);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="Pinocchio"
        height="200"
        // image="https://www.wildrice.com.sg/wr/wp-content/uploads/2022/10/P-2000x2000v2.jpg"
        // image={allEvents[0].image_urls}
        image={img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" margin="left">
          <FavoriteBorderIcon />
        </Button>
      </CardActions>
    </Card>
  );
}
