import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { showEventDetials } from "../../redux/features/eventDetailsModalSlice";
import { AllEventsContext } from "../../context/allEventsContext";
import { Box, Slide, CircularProgress } from "@mui/material";
import { CarouselEventContainer } from "../../styles/carouselEvents";

export default function CarouselEvent() {
  const [eventIndex, setEventIndex] = useState(0);
  const [show, setShow] = useState(true);

  const [featuredEvents, setFeaturedEvents] = useState([]);

  const { allEvents } = useContext(AllEventsContext);

  const dispatch = useDispatch();

  /*  get all events with "is_featured === true", and update to "featuredEvents" */
  useEffect(() => {
    if (allEvents?.length) {
      const allFeaturedEvents = allEvents.filter(
        (event) => event.is_featured === true
      );
      setFeaturedEvents(allFeaturedEvents);
    }
  }, [allEvents]);

  /*  start slider once featuredEvents is updated. */
  useEffect(() => {
    if (featuredEvents?.length) {
      setTimeout(() => {
        setShow(false);
      }, 3000);

      const intervalId = setInterval(() => {
        setEventIndex((i) => {
          return (i + 1) % featuredEvents.length;
        });
        setShow(true);

        setTimeout(() => {
          setShow(false);
        }, 3000);
      }, 4000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [featuredEvents]);

  function handleClickImage() {
    const selectedEvent = featuredEvents[eventIndex];
    dispatch(showEventDetials(selectedEvent));
  }

  return (
    <CarouselEventContainer>
      {featuredEvents[0] ? (
        <Slide
          direction={show ? "left" : "right"}
          in={show}
          timeout={{ enter: 500, exit: 100 }}
        >
          <Box
            sx={{
              height: "400px",
              width: "100%",
            }}
          >
            <img
              height="400px"
              width="100%"
              src={featuredEvents[eventIndex].image_urls}
              onClick={handleClickImage}
              alt={featuredEvents[eventIndex].title}
            />
          </Box>
        </Slide>
      ) : (
        <Box
          sx={{
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </CarouselEventContainer>
  );
}
