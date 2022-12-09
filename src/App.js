import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CalenderMonth from "./pages/calenderMonth";
import CalenderDay from "./pages/calenderDay";
import Event from "./pages/event";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import { TokenContextProvider } from "./context/TokenContext";

function App() {
  return (
    <TokenContextProvider>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="calenderMonth" element={<CalenderMonth />}></Route>
            <Route path="calenderDay" element={<CalenderDay />}></Route>
            <Route path="event" element={<Event />}></Route>
            <Route path="signUp" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Route>
        </Routes>
      </Router>
    </TokenContextProvider>
  );
}

export default App;
