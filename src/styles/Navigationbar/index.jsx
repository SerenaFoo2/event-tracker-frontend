import { Link } from "react-router-dom";
import { styled, Toolbar, Box, Typography } from "@mui/material";

export const NavBarLink = styled(Link)({
  textDecoration: "none",
});

export const NavToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  padding: "0 24px",
});

export const LeftContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "40px",
  alignItems: "center",
}));

export const NavText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: "white", //Colors.text
  fontWeight: 500,
  lineHeight: 1.57,
  letterSpacing: "0.00714em",
  //  follow settings for variant="subtitle2"
}));

export const NavReactLink = styled(Link)({
  textDecoration: "none",
});

export const NavLogoText = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: "white", //Colors.text
  fontWeight: 500,
  lineHeight: 1.57,
  letterSpacing: "0.00714em",
  //  follow settings for variant="h6"
}));

export const RightContainer = styled(Box)({
  display: "flex",
  gap: "20px",
  alignItems: "center",
});
