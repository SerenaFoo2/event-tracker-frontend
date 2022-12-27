import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import httpStatus from "http-status";
import { TextField, Button, Stack, Box } from "@mui/material";
import { FooterText } from "../styles/signUp";
import { UserContext } from "../context/userContext";
import { FormTitle } from "../styles/forms";

export default function Login() {
  const loginInforDefault = { email: "", password: "" };
  const errorDefault = "";

  const [loginInfor, setLoginInfor] = useState(loginInforDefault);
  const [error, setError] = useState(errorDefault);

  const navigate = useNavigate();

  const { setTokens } = useContext(AuthContext);
  const { setUserInfo } = useContext(UserContext);

  /* onSubmitLogin:
      - if login infor are correct, update context for setTokens and setUserInfo.
      - else show error.  
  */
  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    //reset error
    setError(errorDefault);

    try {
      const loginResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        loginInfor
      );

      if (loginResponse.status === httpStatus.OK) {
        const { accessToken, refreshToken, user } = loginResponse.data;
        const { _id, name, role, savedEvents } = user;

        //store tokens
        setTokens((prev) => {
          return { ...prev, accessToken, refreshToken };
        });
        //reset login Inputs
        setLoginInfor(loginInforDefault);

        setUserInfo((prev) => {
          console.log("Login, setUserInfo():", {
            id: _id,
            name,
            role,
            savedEvents,
          });
          return { ...prev, id: _id, name, role, savedEvents };
        });
        return navigate("/");
      }

      // any other error
      throw Error(`${loginResponse.statusText}`);
    } catch (err) {
      if (err.response) {
        const { status, statusText } = err.response;
        switch (status) {
          case httpStatus.NOT_FOUND: //NOT_FOUND; Invalid email
            setError(`${statusText}. Invalid email.`);
            break;
          case httpStatus.FORBIDDEN: //FORBIDDEN; Password mismatch.
            setError(`${statusText}. Password mismatch.`);
            break;
          default:
            setError(`${statusText}. Try again.`);
        }
        return;
      }

      return setError(`${err}`);
    }
  };

  /* onInputsChange
      - reset error, then setLoginInfor
  */
  const handleInputsChange = (e) => {
    const name = e.target.name;

    //clear error
    setError(errorDefault);

    //update loginInfor
    setLoginInfor((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };

  return (
    <Stack justifyContent="center">
      <img
        src="https://images.unsplash.com/photo-1438012940875-4bf705025a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt="dance"
        objectfit="cover"
        position="absolute"
        filter="blur(8px)"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 0, 0, 0.2), rgba(0, 0, 0, 0.75))",
        }}
      />
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }} pt={4}>
          <FormTitle>Login</FormTitle>
        </Box>

        <Stack justifyContent="center" alignItems="center">
          <form onSubmit={handleSubmitLogin}>
            <Stack spacing={2} p={3} sx={{ width: 250 }}>
              <TextField
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
                size="small"
                type="email"
                label="Email"
                variant="outlined"
                name="email"
                value={loginInfor.email}
                required
                onChange={(e) => {
                  handleInputsChange(e);
                }}
              />
              <TextField
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
                size="small"
                type="password"
                label="Password"
                variant="outlined"
                name="password"
                value={loginInfor.password}
                required
                onChange={(e) => {
                  handleInputsChange(e);
                }}
              />
              <Button variant="contained" type="submit" size="small">
                Login
              </Button>

              {error && <FooterText sx={{ color: "red" }}>{error}</FooterText>}
            </Stack>
          </form>

          <Stack spacing={2}>
            <FooterText>
              {`Don't have an account? `}
              <Link to="/signup">Create an account</Link>
            </FooterText>

            <FooterText sx={{ textAlign: "left" }}>
              <Link to="/">Return to Home Page </Link>
            </FooterText>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
