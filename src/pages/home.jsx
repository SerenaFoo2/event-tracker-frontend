import Box from "@mui/material/Box";
import NavigationBar from "../components/navigationBar";
import CarouselEvent from "../components/carouselEvents";
import FeaturedEvents from "../components/featuredEvents";
import { carouselEventCard } from "../components/carouselEvents/carouselEventCard";
import { AllEventsContext } from "../context/allEventsContext";
import { useEffect, useContext } from "react";
import axios from "axios";
import httpStatus from "http-status";

export default function Home() {
  const { setAllEvents, allEvents } = useContext(AllEventsContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const allEventsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/events`
        );
        if (allEventsResponse.status === httpStatus.OK) {
          setAllEvents((prev) => {
            return [...allEventsResponse.data];
          });
          console.log("AllEvents loaded: ", [...allEventsResponse.data]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    if (!allEvents.length) {
      fetchData();
    }
  }, []);

  return (
    <Box>
      <NavigationBar />
      <CarouselEvent images={carouselEventCard} />
      <FeaturedEvents />
    </Box>
  );
}
