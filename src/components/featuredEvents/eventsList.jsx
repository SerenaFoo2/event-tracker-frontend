import EventCard from "./eventCard";
import { useEffect, useContext } from "react";
import { allEventsContext } from "../../context/allEventsContext";
import { Grid, Box, Stack } from "@mui/material";

export default function EventsList() {
  const { allEvents, setAllEvents, fetchData } = useContext(allEventsContext);

  return (
    <Stack spacing={0} px={3} pb={6}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <EventCard />
        </Grid>
        <Grid item xs={6}>
          <EventCard />
        </Grid>
        <Grid item xs={6}>
          <EventCard />
        </Grid>
        <Grid item xs={6}>
          <EventCard />
        </Grid>
      </Grid>
    </Stack>
  );
}
