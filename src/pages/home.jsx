import { useEffect } from "react";
import Box from '@mui/material/Box';
import NavigationBar from "../components/navigationBar";
import CarouselEvent from "../components/carouselEvents";
import FeaturedEvents from "../components/featuredEvents";

export default function Home() {
  const requestHeader = {
    method: "GET",
    mode: "cors",
  };
  useEffect(() => {
    fetch("http://localhost:4000/", requestHeader)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  return ( 
  <Box>
    <NavigationBar />
    <CarouselEvent />
    <FeaturedEvents />
    </Box>
  )
}
