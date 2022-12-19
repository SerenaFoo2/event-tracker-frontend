import EventCard from "./eventCard";
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

  return (
    <Stack spacing={0} px={3} pb={6}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {allEvents.length !== 0 ? displayEvent() : "no data"}
      </Grid>
    </Stack>
  );
}
