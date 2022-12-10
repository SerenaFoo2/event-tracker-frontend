import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Stack, Box } from "@mui/material";
import { FooterText } from "../styles/signUp";

export default function SignUp() {
  const inputDefault = { name: "", email: "", password: "" };
  const errorDefault = { message: "" };

  const [input, setInput] = useState(inputDefault);
  const [error, setError] = useState(errorDefault);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(errorDefault);

    const requestHeader = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    };
    console.log("SignUp-input: ", input);
    try {
      const response = await fetch(
        "http://localhost:4000/auth/signup",
        requestHeader
      );
      const { status, statusText } = response;

      switch (status) {
        case 201: //created
          setInput(inputDefault);
          navigate("/login");
          break;
        case 409: //conflict data
          const errMessage = await response.text();
          setError({ message: errMessage });
          break;
        default:
          setError({ message: `${statusText}. Try again.` });
          break;
      }
    } catch (err) {
      setError({ message: `${err}` });
    }
  };
  const handleChange = (e) => {
    const name = e.target.name;

    //clear error
    setError(errorDefault);

    //update inputs
    setInput((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  };

  return (
    <div>
      SignUp Page
      <Box sx={{ textAlign: "center" }} pt={4}>
        <Typography variant="h6">Create Account</Typography>
      </Box>
      <Stack justifyContent="center" alignItems="center">
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2} p={3} sx={{ width: 250 }}>
            <TextField
              inputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              size="small"
              type="text"
              label="Name"
              variant="outlined"
              name="name"
              value={input.name}
              required
              onChange={(e) => {
                handleChange(e);
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
              value={input.email}
              required
              onChange={(e) => {
                handleChange(e);
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
              value={input.password}
              required
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <FooterText sx={{ textAlign: "left", fontSize: 10 }}>
              By signing up, I agree to the XXX's Terms of Service, Privacy
              Policy and Refund Policy.
            </FooterText>
            <Button variant="contained" type="submit" size="small">
              CREATE
            </Button>

            {error.message && (
              <FooterText sx={{ color: "red" }}>{error.message}</FooterText>
            )}
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
