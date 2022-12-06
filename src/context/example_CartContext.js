import { createContext, useState } from "react";

export const CartContext = createContext();

export const ExampleCartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  });
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

//------to use the context--------//
/*
0. create a react component like above.
1. wrap <ExampleCartContextProvider> </ExampleCartContextProvider> to App, see index.js

2. At anywhere of the component tree where you want to use "cart" or "setCart" : 
import { CartContext } from "..../context/example_CartContext";

export default function AnyReactComponent() {
  const { cart, setCart } = useContext(CartContext);

  return <div>test</div>
}

*/
