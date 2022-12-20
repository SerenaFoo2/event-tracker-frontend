import { useContext } from "react";
import { AllEventsContext } from "../../context/allEventsContext";
import EventCard from "./eventCard";
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

  return (
    <Stack spacing={0} px={3} pb={6}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {allEvents.length > 0 ? displayEvents() : "no events"}
      </Grid>
    </Stack>
  );
}
