import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { getRequestHeader } from "../helper/auth-helper";
import { FooterText } from "../styles/signUp";
import { TextField, Button, Typography, Stack, Box } from "@mui/material";

export default function Login() {
  const inputDefault = { email: "", password: "" };
  const errorDefault = { message: "" };

  const [input, setInput] = useState(inputDefault);
  const [error, setError] = useState(errorDefault);

  const navigate = useNavigate();

  const { setTokens } = useContext(AuthContext);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError(errorDefault);

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
            console.log("Login, stored tokens. ");
            return { ...prev, accessToken, refreshToken };
          });
          setInput(inputDefault);
          navigate("/");
          break;
        case 404: //NOT_FOUND; Invalid email
          setError({ message: "Email not found. Try again." });
          break;
        case 403: //FORBIDDEN; Password mismatch.
          setError({ message: "Password mismatch. Try again." });
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
    <Stack justifyContent="center">
      <Box sx={{ textAlign: "center" }} pt={4}>
        <Typography variant="h6">Login</Typography>
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
            <Button variant="contained" type="submit" size="small">
              Login
            </Button>

            {error.message && (
              <FooterText sx={{ color: "red" }}>{error.message}</FooterText>
            )}
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
    </Stack>
  );
}
