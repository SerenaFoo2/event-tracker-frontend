import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

export const defaultTokens = { accessToken: "", refreshToken: "" };

export const AuthContextProvider = ({ children }) => {
  const [tokens, setTokens] = useState(defaultTokens);

  /* Get new accessToken using refreshToken   */
  async function getNewToken() {
    const authHeader = {
      headers: { authorization: "Bearer " + tokens.refreshToken },
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/token`,
        authHeader
      );
      setTokens((prev) => {
        return { ...prev, accessToken: response.data.accessToken };
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  /* axiosJWT is meant to use with JWT to access protected routes. */
  const axiosJWT = axios.create();

  /* axiosJWT request interceptor check for tokens validity:
      - if accessToken ok, append headers with token.
      - if accessToken nok, get new Token and append headers with new token.
      - if refreshToken nok, do nothing.
  */
  axiosJWT.interceptors.request.use(
    async (config) => {
      const { accessToken, refreshToken } = tokens;

      // accessToken is ""
      if (!accessToken) {
        return config;
      }

      // refreshToken has expired.
      const currentDate_ms = Date.now();
      const decodedRefreshToken_exp_ms = jwt_decode(refreshToken).exp * 1000;
      if (decodedRefreshToken_exp_ms < currentDate_ms) {
        return config;
      }

      const decodedAccessToken_exp_ms = jwt_decode(accessToken).exp * 1000;
      // console.log(
      //   "decodedAccessToken_exp_ms - currentDate_ms",
      //   decodedAccessToken_exp_ms - currentDate_ms
      // );
      // console.log(
      //   "decodedRefreshToken_exp_ms - currentDate_ms",
      //   decodedRefreshToken_exp_ms - currentDate_ms
      // );
      if (decodedAccessToken_exp_ms < currentDate_ms) {
        // accessToken has expired.
        const { accessToken: newAccessToken } = await getNewToken();
        config.headers["authorization"] = "Bearer " + newAccessToken;
        console.log("get newAccessToken ok!");
      } else {
        // accessToken has not expired.
        config.headers["authorization"] = "Bearer " + accessToken;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  /* axiosJWT response interceptor :
      - display error message on error, for easier troubleshooting.
  */
  axiosJWT.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("interceptors.response-error: ", error);
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider value={{ tokens, setTokens, axiosJWT }}>
      {children}
    </AuthContext.Provider>
  );
};
