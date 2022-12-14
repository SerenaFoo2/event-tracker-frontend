// import { Link } from "react-router-dom";
import { AppBar } from "@mui/material";
import { NavToolbar } from "../../styles/navBar";
import LeftBar from "./leftBar";
import RightBar from "./rightBar";

export default function NavigationBar() {
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "rgba(133, 0, 0)" }}
        // sx={{ color: "primary.dark", backgroundColor: "#fff" }}
      >
        <NavToolbar>
          <LeftBar />
          {/* <Link to="/fetch">examplefetchData</Link> */}
          <RightBar />
        </NavToolbar>
      </AppBar>
    </>
  );
}
