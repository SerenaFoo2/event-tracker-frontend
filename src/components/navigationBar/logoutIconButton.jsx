import { useContext } from "react";
import { UserContext, defaultUserInfo } from "../../context/userContext";
import { AuthContext, defaultTokens } from "../../context/authContext";
import { NavText } from "../../styles/navBar";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function LogoutIconButton() {
  const { setUserInfo } = useContext(UserContext);
  const { setTokens } = useContext(AuthContext);

  function handleClickLogout() {
    // reset to default
    setUserInfo(defaultUserInfo);
    setTokens(defaultTokens);
  }

  return (
    <IconButton aria-label="logout" onClick={handleClickLogout}>
      <AccountCircleIcon sx={{ fontSize: "1.5rem", paddingX: 1 }} />
      <NavText>Logout</NavText>
    </IconButton>
  );
}
