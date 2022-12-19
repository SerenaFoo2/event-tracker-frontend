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
          <EmojiEmotionsIcon
            color="primary"
            sx={{ fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2rem" } }}
          />
          <NavLogoText sx={{ display: { xs: "none", sm: "block" } }}>
            My Events
          </NavLogoText>
        </Stack>
      </NavReactLink>

      <Stack direction="row" sx={{ gap: { xs: "0", sm: "40px" } }}>
        <NavReactLink to="/" sx={{ display: { xs: "none", sm: "flex" } }}>
          <NavText>Home</NavText>
        </NavReactLink>
        <NavReactLink to="/myEvents">
          <NavText>My Events</NavText>
        </NavReactLink>
      </Stack>
    </LeftContainer>
  );
}
