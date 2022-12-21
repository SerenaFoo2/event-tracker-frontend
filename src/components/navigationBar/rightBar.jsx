import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { RightContainer, NavText } from "../../styles/navigationbar";
import LoginIconButton from "./loginIconButton";
import LogoutIconButton from "./logoutIconButton";

export default function RightBar() {
  const { role, name } = useContext(UserContext).userInfo;

  return (
    <RightContainer>
      <NavText>
        {`${role === "admin" ? "Admin Mode" : ""}`}
        {`${role === "user" ? "Hello, " + name : ""}`}
      </NavText>

      {!role && <LoginIconButton />}
      {role && <LogoutIconButton />}
    </RightContainer>
  );
}
