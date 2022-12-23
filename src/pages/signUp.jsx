import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import httpStatus from "http-status";
import { TextField, Button, Stack, Box } from "@mui/material";
import { FooterText } from "../styles/signUp";
import { FormTitle } from "../styles/forms";

export default function SignUp() {
  const inputInforDefault = { name: "", email: "", password: "" };
  const errorDefault = "";

  const [inputInfor, setInputInfor] = useState(inputInforDefault);
  const [error, setError] = useState(errorDefault);

  const navigate = useNavigate();

  /* onSubmitSignUp:
      - if input infor do not conflict with db, store to db, then navigate to /login.
      - else show error.  
  */
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();

    //reset error
    setError(errorDefault);

    console.log("SignUp-inputInfor: ", inputInfor);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users`,
        inputInfor
      );
      const { status, statusText } = response;

      if (status === httpStatus.CREATED) {
        setInputInfor(inputInforDefault);
        return navigate("/login");
      }

      throw Error(`${statusText}`);
    } catch (err) {
      if (err.response) {
        const { status, statusText, data } = err.response;
        switch (status) {
          case httpStatus.CONFLICT:
            setError(`${data}`);
            break;
          default:
            setError(`${statusText}. Try again.`);
            break;
        }
        return;
      }

      return setError(`${err}`);
    }
  };
  const handleInputsChange = (e) => {
    const name = e.target.name;

    //clear error
    setError(errorDefault);

    //update inputInfor
    setInputInfor((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };

  return (
    <div>
      <img
        src="https://images.unsplash.com/photo-1438012940875-4bf705025a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt="dance"
        objectfit="cover"
        height="100%"
        width="100%"
        position="absolute"
        filter="blur(8px)"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 0, 0, 0.2), rgba(0, 0, 0, 0.75))",
        }}
      />
      <div
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
          <FormTitle>
            <strong>Create Account</strong>
          </FormTitle>
        </Box>
        <Stack justifyContent="center" alignItems="center">
          <Box component="form" onSubmit={handleSubmitSignUp}>
            <Stack spacing={2} p={3} sx={{ width: 250 }}>
              <TextField
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
                size="small"
                type="text"
                label="Name"
                variant="outlined"
                name="name"
                value={inputInfor.name}
                required
                onChange={(e) => {
                  handleInputsChange(e);
                }}
              />
              <TextField
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
                size="small"
                type="email"
                label="Email"
                variant="outlined"
                name="email"
                value={inputInfor.email}
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
                value={inputInfor.password}
                required
                onChange={(e) => {
                  handleInputsChange(e);
                }}
              />
              <FooterText sx={{ textAlign: "left", fontSize: 10 }}>
                By signing up, I agree to the XXX's Terms of Service, Privacy
                Policy and Refund Policy.
              </FooterText>
              <Button variant="contained" type="submit" size="small">
                CREATE
              </Button>

              {error && <FooterText sx={{ color: "red" }}>{error}</FooterText>}
            </Stack>
          </Box>

          <Stack spacing={2} sx={{ width: 250 }}>
            <FooterText>
              {`Already have an account? `} <Link to="/login">Login</Link>
            </FooterText>

            <FooterText sx={{ textAlign: "left" }}>
              <Link to="/">Return to Home Page </Link>
            </FooterText>
          </Stack>
        </Stack>
      </div>
    </div>
  );
}
