import { Link } from "react-router-dom";
import { Box, List, styled, Typography, Grid } from "@mui/material";
// import { Colors } from "../theme";

export const FooterContainer = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  padding: "56px", //"64px",
  background: "lightblue",
  color: "white",
  [theme.breakpoints.down("md")]: { fontSize: "12px", padding: "64px 32px" },
}));

export const FooterTitle = styled(Typography)(() => ({
  // textTransform: "uppercase",
  fontWeight: 500,
  fontSize: "1rem",
  lineHeight: 2,
  letterSpacing: "0.033em",
  margin: "1em 0",
}));

export const FooterLink = styled(Link)({
  textDecoration: "none",
  color: "white",
});

export const FooterText = styled(Typography)({
  fontSize: "0.875rem",
  lineHeight: 2,
  // letterSpacing: "0.033em",
  color: "white",
});

export const ListContainer = styled(List)({
  padding: 0,
});

export const GridItemContainer = styled(Grid)(({ theme }) => ({
  textAlign: "left",
  [theme.breakpoints.down("sm")]: { textAlign: "center" },
}));
