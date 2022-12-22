import { useEffect, useState, useContext } from "react";
import { Box, Slide } from "@mui/material";
import { AllEventsContext } from "../../context/allEventsContext";
import { CarouselEventContainer } from "../../styles/carouselEvents";

export default function CarouselEvent() {
  const [eventIndex, setEventIndex] = useState(0);
  const [show, setShow] = useState(true);

  const [featuredEvents, setFeaturedEvents] = useState([]);

  const { allEvents } = useContext(AllEventsContext);

  // console.log(allEvents[0]?.title ? allEvents[0]?.title : "no infor yet");

  /*  get all events with "is_featured === true", and update to "featuredEvents" */
  useEffect(() => {
    if (allEvents?.length) {
      const allFeaturedEvents = allEvents.filter(
        (event) => event.is_featured === true
      );
      setFeaturedEvents(allFeaturedEvents);
      // console.log("allFeaturedEvents: ", allFeaturedEvents);
    }
  }, [allEvents]);

  /*  start slider once featuredEvents is updated. */
  useEffect(() => {
    if (featuredEvents?.length) {
      setTimeout(() => {
        setShow(false);
      }, 3000);

      // console.log(allEvents[0]?.price);
      const intervalId = setInterval(() => {
        setEventIndex((i) => {
          // console.log(i, featuredEvents.length);
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

  return (
    <CarouselEventContainer>
      <Slide
        direction={show ? "left" : "right"}
        in={show}
        timeout={{ enter: 500, exit: 100 }}
      >
        <Box
          sx={{
            // border: "4px dashed green",
            height: "400px",
            width: "100%",
          }}
        >
          {featuredEvents[0] ? (
            <img
              height="400px"
              width="100%"
              src={featuredEvents[eventIndex].image_urls}
              onClick={() => {
                const selectedEvent = featuredEvents[eventIndex];
                alert("you have click on event: ", selectedEvent); //! add event details
              }}
              alt={featuredEvents[eventIndex].title}
            />
          ) : (
            <Box>""</Box> //! add loader
          )}
        </Box>
      </Slide>
    </CarouselEventContainer>
  );
}
