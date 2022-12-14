import { NavReactLink, NavText } from "../../styles/navBar";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function LoginIconButton() {
  return (
    <NavReactLink to="/login">
      <IconButton aria-label="login">
        <AccountCircleIcon
          sx={{ fontSize: "1.5rem", paddingX: 1 }}
          style={{ color: "white" }}
        />
        <NavText> Login / SignUp</NavText>
      </IconButton>
    </NavReactLink>
  );
}
