import EventsList from "./eventsList";
import { Box, Stack } from "@mui/material";
import { FeaturedEventsTitle } from "../../styles/featuredEvents";

export default function FeaturedEvents() {
  return (
    <Stack spacing={0} px={3} pb={6}>
      <Box sx={{ textAlign: "center", marginTop: 5, marginBottom: 4 }}>
        <FeaturedEventsTitle>Featured Events</FeaturedEventsTitle>
      </Box>
      <EventsList />
    </Stack>
  );
}
