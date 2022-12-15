import EventCard from "./eventCard";
import { Grid, Box } from "@mui/material";


export default function EventsList() {
  return (

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
  )
}
