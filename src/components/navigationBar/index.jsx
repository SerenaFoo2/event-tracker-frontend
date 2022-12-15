import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

export default function NavigationBar() {
  return (
    <React.Fragment>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Button variant="text">Home</Button>
          <Button variant="text">
            <Link to="/myEvents">My Events</Link>
          </Button>
          <Button variant="text">
            <Link to="/login">Login/ Signup</Link>
          </Button>
          <Link to="/fetch">examplefetchData</Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}
