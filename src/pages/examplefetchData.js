import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import Button from "@mui/material/Button";
import { getRequestHeader } from "../helper/auth-helper";
import { Link } from "react-router-dom";

export default function ExamplefetchData() {
  const { tokens, setTokens, getAuthRequestHeader } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  const handleClickLogin = async (e) => {
    e.preventDefault();
    const input = { email: "loo@hotmail.com", password: "abc" };

    const requestHeader = getRequestHeader("POST", input);
    try {
      // "http://localhost:4000/auth/login"
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        requestHeader
      );

      const { status, statusText } = response;

      switch (status) {
        case 200: //ok; login success
          const { accessToken, refreshToken } = await response.json();
          //store tokens
          setTokens((prev) => {
            console.log("setTokens ok!");
            return { ...prev, accessToken, refreshToken };
          });
          break;
        case 404: //NOT_FOUND; Invalid email
          throw Error(`${statusText}. Invalid email.`);
        case 403: //FORBIDDEN; Password mismatch.
          throw Error(`${statusText}. Password mismatch.`);
        default:
          throw Error(`${statusText}. Try again.`);
      }
    } catch (err) {
      alert(`handleClickLogin Error: ${err}`);
    }
  };

  const handleClickProtectedFetch = async (e) => {
    e.preventDefault();

    try {
      const requestHeader = await getAuthRequestHeader("GET");
      console.log("requestHeader ok.", requestHeader);

      // if requestHeader is false
      if (!requestHeader)
        throw Error("getAuthRequestHeader Error. Check if token is empty.");

      //  http://localhost:4000/
      const response = await fetch(
        process.env.REACT_APP_API_URL,
        requestHeader
      );

      const { status, statusText } = response;

      if (status === 200) {
        const data = await response.json();
        console.log("fetch success: ", data);
        return;
      }
      // any other errors
      throw Error(`${statusText}`);
    } catch (err) {
      // any other errors
      alert(`handleClick Error: ${err}`);
    }
  };

  const handleClickPublicFetch = async (e) => {
    e.preventDefault();
    const requestHeader = getRequestHeader("GET");
    console.log("requestHeader ok.", requestHeader);

    try {
      //  http://localhost:4000/
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/events`,
        requestHeader
      );

      const { status, statusText } = response;

      if (status === 200) {
        const data = await response.json();
        setEvents(data);
        console.log("fetch success: ", data);
        return;
      }
      // any other errors
      throw Error(`${statusText}`);
    } catch (err) {
      // any other errors
      alert(`handleClick Error: ${err}`);
    }
  };

  return (
    <div>
      <Link to="/">Return to Home Page</Link> <br></br>
      Example:fetch data from protected routes Page
      <hr></hr>
      <Button onClick={handleClickProtectedFetch} variant="outlined">
        Protected Route Fetch "/"
      </Button>
      <br></br>
      <Button onClick={handleClickLogin} variant="outlined">
        Login
      </Button>
      <br></br>
      <div> accessToken: {tokens.accessToken}</div>
      <br></br>
      <div>refreshToken: {tokens.refreshToken}</div>
      <hr></hr>
      <Button onClick={handleClickPublicFetch} variant="outlined">
        Public Route Fetch "/events"
      </Button>
      <hr></hr>
      {/* {events && events[0]} */}
    </div>
  );
}
