import { createContext, useState } from "react";
import axios from "axios";

export const AllEventsContext = createContext();

export const AllEventsContextProvider = ({ children }) => {
  const [allEvents, setAllEvents] = useState([]);

  return (
    <AllEventsContext.Provider value={{ allEvents, setAllEvents }}>
      {children}
    </AllEventsContext.Provider>
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
