import {
  LeftContainer,
  NavText,
  NavReactLink,
  NavLogoText,
} from "../../styles/navBar";
import { Stack } from "@mui/material";
import TheaterComedySharpIcon from "@mui/icons-material/TheaterComedySharp";

export default function LeftBar() {
  return (
    <LeftContainer>
      <NavReactLink to="/">
        <Stack direction="row" alignItems="center" gap="5px" px={0} py={2}>
          <TheaterComedySharpIcon
            sx={{ fontSize: "2rem" }}
            style={{ color: "white" }}
          />
          <NavLogoText sx={{ display: "block" }}>WATch!</NavLogoText>
        </Stack>
      </NavReactLink>

      <Stack direction="row" sx={{ gap: "40px" }}>
        <NavReactLink to="/" sx={{ display: "flex" }}>
          <NavText>Home</NavText>
        </NavReactLink>
        <NavReactLink to="/myEvents">
          <NavText>My Events</NavText>
        </NavReactLink>
      </Stack>
    </LeftContainer>
  );
}
