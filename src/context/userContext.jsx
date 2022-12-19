import { createContext, useState } from "react";

export const UserContext = createContext();
export const defaultUserInfo = {
  id: "",
  name: "",
  role: "",
  savedEvents: [],
};
export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
