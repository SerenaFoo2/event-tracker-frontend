import { Box, Slide } from "@mui/material";
import { useEffect, useState } from "react";
// import carouselEventCard from "./carouselEventCard";
import {
  EventSlider,
  CarouselEventContainer,
} from "../../styles/carouselEvents";

const messages = [
  {
    image: "/images/butterfly.jpg",
    title: "The Butterfly Lovers",
  },
  {
    image: "/images/hotel.jpg",
    title: "Hotel",
  },
  {
    image: "/images/inspector.jpg",
    title: "An Inspector Calls",
  },
  {
    image: "/images/monster.jpg",
    title: "A Monster Calls",
  },
  {
    image: "/images/pinocchio.jpg",
    title: "Pinocchio",
  },
];

export default function CarouselEvent() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);

    const intervalId = setInterval(() => {
      setMessageIndex((i) => {
        return (i + 1) % messages.length;
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

  return (
    <CarouselEventContainer>
      <Slide
        direction={show ? "left" : "right"}
        in={show}
        timeout={{ enter: 500, exit: 100 }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <EventSlider>{messages[messageIndex].image}</EventSlider>
        </Box>
      </Slide>
    </CarouselEventContainer>
  );
}
