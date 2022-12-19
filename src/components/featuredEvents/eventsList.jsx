import { useContext } from "react";
import { AllEventsContext } from "../../context/allEventsContext";
import EventCard from "./eventCard";
<<<<<<< HEAD
import { useContext } from "react";
import { AllEventsContext } from "../../context/allEventsContext";
import { Grid, Box, Stack } from "@mui/material";

export default function EventsList() {
  const { allEvents, setAllEvents } = useContext(AllEventsContext);

  function displayEvent() {
    const eventsCards = allEvents.map((event) => {
      return (
        <Grid item xs={6}>
          <EventCard img={event.image_urls} title={event.arts_groups} />
        </Grid>
      );
    });
    return eventsCards;
  }

  console.log(allEvents.length !== 0 ? allEvents[0].image_urls : "no data");
  console.log(allEvents[0]?.arts_groups);
=======
import { Grid, Stack } from "@mui/material";

export default function EventsList() {
  const { allEvents } = useContext(AllEventsContext);

  function displayEvents() {
    const events = allEvents.map((event) => {
      return (
        <Grid item xs={6} key={event._id}>
          <EventCard event={event} />
        </Grid>
      );
    });
    return events;
  }
>>>>>>> a2ce4bd2aaab1fe7330c8ab89af365b3429bcabf

  return (
    <Stack spacing={0} px={3} pb={6}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
<<<<<<< HEAD
        {allEvents.length !== 0 ? displayEvent() : "no data"}
=======
        {allEvents.length > 0 ? displayEvents() : "no events"}
>>>>>>> a2ce4bd2aaab1fe7330c8ab89af365b3429bcabf
      </Grid>
    </Stack>
  );
}
