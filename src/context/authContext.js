import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [tokens, setTokens] = useState({ accessToken: "", refreshToken: "" });

  /* check if tokens is valid:
      - return accessToken:
        - if accessToken is not expired.
      - return false:
        - if accessToken is "".
        - if refreshToken is expired.
        - any other uncaught error.
  */
  async function getAccessToken(tokens) {
    const { accessToken, refreshToken } = tokens;

    //scenario: accessToken is "".
    if (!accessToken) {
      console.log("accessToken is ''");
      return false;
    }
    try {
      //scenario: accessToken is NOT "".
      const currDate_seconds = Math.floor(Date.now() / 1000);
      const accessToken_exp = jwt_decode(accessToken).exp;

      //scenario: accessToken NOT expired.
      if (currDate_seconds - accessToken_exp < 0) {
        console.log("accessToken ok.");
        return accessToken;
      }

      //scenario: Both accessToken and refreshToken expired.
      const refreshToken_exp = jwt_decode(refreshToken).exp;
      if (currDate_seconds - refreshToken_exp > 0) {
        console.log("refreshToken Nok.");
        return false;
      }

      //scenario: accessToken expired and refreshToken NOT expired.
      //get new accessToken
      //    "http://localhost:4000/auth/token"
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/token`,
        authRequestHeader("get", "", refreshToken)
      );
      if (response.status === 200) {
        const { accessToken: newAccessToken } = await response.json();
        // store updated accessToken
        setTokens((prev) => {
          return { ...prev, accessToken: newAccessToken };
        });
        console.log("fetched new accessToken ok.");
        return newAccessToken;
      }
      //scenario: any other error
      console.log("getAccessToken other error.");
      return false;
      // return true;
    } catch (err) {
      //scenario: any other error
      alert(`getAccessToken Error: ${err}`);
      return false;
    }
  }

  /* check if accessToken is valid, :
      - if valid, return reqHeader obj.
      - if invalid, return false.
  */
  async function getAuthRequestHeader(requestMethod, payloadObj = {}) {
    try {
      const accessToken = await getAccessToken(tokens);
      console.log(" inside getAuthRequestHeader: ", accessToken);
      //if accessToken is invalid.
      if (!accessToken) {
        return false;
      }

      //if accessToken is valid
      const reqHeader = authRequestHeader(
        requestMethod,
        payloadObj,
        accessToken
      );
      return reqHeader;
    } catch (err) {
      alert(`getAuthRequestHeader Error: ${err}`);
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ tokens, setTokens, getAuthRequestHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

/*return reqHeader obj for protected routes*/
function authRequestHeader(requestMethod, payloadObj = {}, jwtoken = "") {
  requestMethod = requestMethod.toLowerCase();

  const reqHeader = {
    method: requestMethod,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtoken || ""}`,
    },
    //get method cannot have body.
    body: requestMethod === "get" ? null : JSON.stringify(payloadObj),
  };
  return reqHeader;
}

//------to use the context--------//
/*
0. create a react component like above.
1. wrap <ExampleCartContextProvider> </ExampleCartContextProvider> to App, see index.js

2. At anywhere of the component tree where you want to use "cart" or "setCart" : 
import { AuthContext } from "..../context/example_CartContext";

export default function AnyReactComponent() {
  const { tokens, setTokens } = useContext(CartContext);

  return <div>test</div>
}

*/
