import { useEffect, useContext } from "react";
import axios from "axios";
import httpStatus from "http-status";
import { AllEventsContext } from "../context/allEventsContext";
import Box from "@mui/material/Box";
import NavigationBar from "../components/navigationBar";
import CarouselEvent from "../components/carouselEvents";
import FeaturedEvents from "../components/featuredEvents";
import { carouselEventCard } from "../components/carouselEvents/carouselEventCard";

export default function Home() {
  const { setAllEvents } = useContext(AllEventsContext);

  useEffect(() => {
    async function fetchAllEvents() {
      try {
        const allEventsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/events`
        );
        if (allEventsResponse.status === httpStatus.OK) {
          setAllEvents(allEventsResponse.data);
          console.log("AllEvents loaded: ", allEventsResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchAllEvents();
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <NavigationBar />
      <CarouselEvent />
      <FeaturedEvents />
    </Box>
  );
}
