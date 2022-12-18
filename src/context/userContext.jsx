import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const defaultUserInfo = {
    id: "",
    name: "",
    role: "",
    savedEvents: [],
  };
  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  //TODO fetch all events on load.

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

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
