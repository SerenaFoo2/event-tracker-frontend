import { styled, Typography } from "@mui/material";
import { Colors } from "../theme";

export const FormTitle = styled(Typography)(({ theme }) => ({
  color: Colors.text,
  fontSize: "1.25rem",
  fontWeight: 500,
  lineHeight: 1.6,
  letterSpacing: "0.0075em",
  // same as variant: h6
}));
