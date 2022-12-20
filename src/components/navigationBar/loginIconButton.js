import { NavReactLink, NavText } from "../../styles/navigationbar";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function LoginIconButton() {
  return (
    <NavReactLink to="/login">
      <IconButton aria-label="login">
        <AccountCircleIcon
          sx={{ fontSize: "1.5rem" }}
          // { xs: "1.4rem", sm: "1.4rem", md: "1.5rem" }
        />
        <NavText> Login / SignUp</NavText>
      </IconButton>
    </NavReactLink>
  );
}
