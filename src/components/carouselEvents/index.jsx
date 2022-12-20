import { Box, Slide } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { AllEventsContext } from "../../context/allEventsContext";

import {
  EventSlider,
  CarouselEventContainer,
} from "../../styles/carouselEvents";

export default function CarouselEvent() {
  const [eventIndex, setEventIndex] = useState(0);
  const [show, setShow] = useState(true);
  const { allEvents } = useContext(AllEventsContext);
  const [featuredEvents, setFeaturedEvents] = useState([]);

  function featuredCards() {
    if (allEvents[0]) {
      const allfeaturedCards = allEvents.filter((event) => {
        return event.is_featured === true;
      });
      setFeaturedEvents(allfeaturedCards);
    }
  }

  console.log(allEvents[0] && allEvents?.image_urls);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);

    console.log(allEvents && allEvents?.image_urls);

    const intervalId = setInterval(() => {
      setEventIndex((i) => {
        console.log(i, allEvents.length);
        return (i + 1) % (allEvents.length > 0 ? allEvents.length : 0);
      });
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 3000);
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  // console.log(allEvents && allEvents[0].image_urls);

  return (
    <CarouselEventContainer>
      {/* {allEvents && setFeaturedEvents()} */}
      <Slide
        direction={show ? "left" : "right"}
        in={show}
        timeout={{ enter: 500, exit: 100 }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <EventSlider>
            <img
              src={allEvents && allEvents[eventIndex]?.image_urls}
              alt="pic"
            />
          </EventSlider>
        </Box>
      </Slide>
    </CarouselEventContainer>
  );
}
