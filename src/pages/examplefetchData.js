import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import axios from "axios";
import httpStatus from "http-status";
import Button from "@mui/material/Button";

export default function ExamplefetchData() {
  const { tokens, setTokens, axiosJWT } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  const handleClickLoginAxios = async (e) => {
    e.preventDefault();
    setError("");
    const loginInfor = { email: "loo@hotmail.com", password: "abc" };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        loginInfor
      );

      console.log("tokens: ", response.data);
      const { status, statusText, data } = response;
      if (status === httpStatus.OK) {
        const { accessToken, refreshToken } = data;
        setTokens((prev) => {
          return { ...prev, accessToken, refreshToken };
        });
        return;
      }
      // any other errors
      throw Error(`${statusText}`);
    } catch (err) {
      if (err.response) {
        const { status, statusText } = err.response;
        switch (status) {
          case httpStatus.NOT_FOUND:
            setError(`${statusText}. Invalid email.`);
            break;
          case httpStatus.FORBIDDEN:
            setError(`${statusText}. Password mismatch.`);
            break;
          default:
            setError(`${statusText}. Try again.`);
        }
        return;
      }
      setError(`${err}`);
    }
  };

  const handleClickProtectedAxiosJWT = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axiosJWT.get(process.env.REACT_APP_API_URL);
      const { status, statusText, data } = response;

      if (status === httpStatus.OK) {
        console.log("axios protected get success: ", data);
        return;
      }
      // any other errors
      throw Error(`${statusText}`);
    } catch (err) {
      // any other errors
      if (err.response) {
        const { status, statusText } = err.response;
        switch (status) {
          case httpStatus.UNAUTHORIZED:
            setError(`${statusText}.`);
            break;
          default:
            setError(`${statusText}.`);
        }
        return;
      }
      setError(`${err}`);
    }
  };

  const handleClickPublicAxios = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/events`
      );

      const { status, statusText, data } = response;

      if (status === 200) {
        setEvents(data);
        console.log("axios public get success: ", data);
        return;
      }
      // any other errors
      throw Error(`${statusText}`);
    } catch (err) {
      // any other errors
      setError(`${err}`);
    }
  };

  return (
    <div>
      <Link to="/">Return to Home Page</Link> <br></br>
      Example:fetch data from protected routes Page
      <hr></hr>
      <Button onClick={handleClickProtectedAxiosJWT} variant="outlined">
        Protected Route AxiosJWT "/"
      </Button>
      <br></br>
      <Button onClick={handleClickLoginAxios} variant="outlined">
        Login Axios
      </Button>
      <div>Error: {error}</div>
      <br></br>
      <div> accessToken: {tokens.accessToken}</div>
      <br></br>
      <div>refreshToken: {tokens.refreshToken}</div>
      <hr></hr>
      <Button onClick={handleClickPublicAxios} variant="outlined">
        Public Route Axios "/events"
      </Button>
      <hr></hr>
    </div>
  );
}
