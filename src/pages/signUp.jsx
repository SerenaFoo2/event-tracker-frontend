import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import httpStatus from "http-status";
import { TextField, Button, Typography, Stack, Box } from "@mui/material";
import { FooterText } from "../styles/signUp";
import { Colors } from "../styles/theme";

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
      SignUp Page
      <Box sx={{ textAlign: "center" }} pt={4}>
        <Typography variant="h6" color={Colors.text}>
          Create Account
        </Typography>
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
  );
}
