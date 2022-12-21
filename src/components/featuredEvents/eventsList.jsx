import { useContext } from "react";
import { AllEventsContext } from "../../context/allEventsContext";
import EventCard from "./eventCard";
import { Grid, Stack } from "@mui/material";

export default function EventsList() {
  const { allEvents } = useContext(AllEventsContext);

  function displayEvents() {
    const events = allEvents.map((event) => {
      return (
        <Grid item xs={6} md={4} key={event._id}>
          <EventCard event={event} />
        </Grid>
      );
    });
    return events;
  }

  return (
    <Stack spacing={0} px={3} pb={6}>
      <Grid container rowSpacing={3}>
        {allEvents.length > 0 ? displayEvents() : ""}
      </Grid>
    </Stack>
  );
}
