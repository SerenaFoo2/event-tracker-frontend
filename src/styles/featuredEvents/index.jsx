import { styled, Typography } from "@mui/material";
import { Colors } from "../theme";

export const EventTitle = styled(Typography)(({ theme }) => ({
  color: Colors.text,
  fontSize: "1.25rem",
  fontWeight: 500,
  lineHeight: 1.6,
  letterSpacing: "0.0075em",
  // same as variant: h6
}));

export const EventTextBody = styled("span")(({ theme }) => ({
  fontSize: "1rem",
  color: Colors.text,
  lineHeight: 1.6,
  letterSpacing: "0.0075em",
}));

export const EventDetailsHeader = styled("span")(({ theme }) => ({
  fontSize: "0.85rem",
  color: Colors.text,
  fontWeight: 600,
  lineHeight: 1.6,
  letterSpacing: "0.0075em",
}));

export const EventDetailsBody = styled("span")(({ theme }) => ({
  fontSize: "0.85rem",
  color: Colors.text,
  lineHeight: 1.6,
  letterSpacing: "0.0075em",
}));

export const CardTitle = styled(Typography)(({ theme }) => ({
  color: Colors.text,
  fontSize: "1rem",
  fontWeight: 500,
  lineHeight: 1.75,
  letterSpacing: "0.00938em",
  // same as variant: subtitle1
}));

export const CardText = styled(Typography)(({ theme }) => ({
  color: Colors.text,
  fontSize: "0.65rem",
  // fontWeight: 500,
  lineHeight: 1.75,
  letterSpacing: "0.00938em",
  // same as variant: subtitle1
}));

export const FeaturedEventsTitle = styled(Typography)(({ theme }) => ({
  color: Colors.text,
  fontSize: "1.5rem",
  fontWeight: 500,
  lineHeight: 1.335,
  letterSpacing: "0",
  // same as variant: h5
}));
