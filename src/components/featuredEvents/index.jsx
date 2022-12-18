import Filter from "./filter";
import EventCard from "./eventCard";
import EventsList from "./eventsList";
import { Grid, Box, Stack, Typography } from "@mui/material";
import { Colors } from "../../styles/theme";

export default function FeaturedEvents() {
  return (
    <Stack spacing={0} px={3} pb={6}>
      <Box sx={{ textAlign: "center" }} py={5}>
        <Typography variant="h5" color={Colors.text}>
          Featured Events
        </Typography>

      </Box>
      <Filter style="text-align:left" />
      <EventsList />
    </Stack>

  );
}
