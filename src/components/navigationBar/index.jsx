import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { AppBar } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import RightBar from "./RightBar";

export default function NavigationBar() {
  return (
    <React.Fragment>
      <AppBar position="sticky" color="inherit" style={{backgroundColor: "#FF0000", color: "white", boxShadow: "0px 0px 0px 0px"}}>
        <Toolbar>
          <Button variant="text" style={{color:"white"}}>Home</Button>
          <Button variant="text" style={{color:"white"}}>
            <Link to="/myEvents">My Events</Link>
          </Button>
          <Button variant="text">
            <Link to="/login">Login/ Signup</Link>
          </Button>
          <Link to="/fetch">examplefetchData</Link>
          <RightBar >Login</RightBar>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
