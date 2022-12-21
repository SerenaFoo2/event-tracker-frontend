import {
  LeftContainer,
  NavText,
  NavReactLink,
  NavLogoText,
} from "../../styles/navigationbar";
import { Stack } from "@mui/material";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

export default function LeftBar() {
  return (
    <LeftContainer>
      <NavReactLink to="/">
        <Stack direction="row" alignItems="center" gap="5px" px={0} py={2}>
          <EmojiEmotionsIcon color="primary" sx={{ fontSize: "2rem" }} />
          <NavLogoText sx={{ display: "block" }}>My Events</NavLogoText>
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
