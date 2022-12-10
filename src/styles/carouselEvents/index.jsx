import { Box, styled, Typography } from "@mui/material";

export const CarouselEventContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: "0px",
  backgroundColor: "lightblue",
//   [theme.breakpoints.down("sm")]: {
//     flexDirection: "column",
//     alignItems: "center",
//   },

    [theme.breakpoints.down("md")]: {
      padding: "100px 100px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "100px 100px",
    },
}));

export const EventSlider = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  color: "white",
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
  },
}));
