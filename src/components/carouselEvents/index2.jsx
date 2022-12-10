import { Box, Slide } from "@mui/material";
import { useEffect, useState } from "react";
import CarouselEventCard from "./carouselEventCard";
import {
  EventSlider,
  CarouselEventContainer,
} from "../../styles/carouselEvents";


    const messages = [
      "10% off on your first order!",
      "Singapore sale starts now, visit any store.",
      "Additonal 20% off on second items!",
    ];


export default function CarouselEvent() {
  const [eventIndex, setEventIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);

    const intervalId = setInterval(() => {
      setEventIndex((i) => {return (i + 1) % messages.length});
      setShow(true);


      setTimeout(() => {
        setShow(false);
      }, 3000);
    }, 4000);


  //   const intervalId = setInterval(() => {
  //     setMessageIndex((i) => (i + 1) % messages.length);
  //     setShow(true);

  //     setTimeout(() => {
  //       setShow(false);
  //     }, 3000);
  //   }, 4000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <CarouselEventContainer>
      <Slide
        direction={show ? "left" : "right"}
        in={show}
        timeout={{ enter: 500, exit: 100 }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <EventSlider>{CarouselEventCard[eventIndex]}</EventSlider>
        </Box>
      </Slide>
    </CarouselEventContainer>
  );
}
