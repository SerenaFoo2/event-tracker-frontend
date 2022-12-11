import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CalendarMonth from "./pages/calendarMonth";
import Event from "./pages/event";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import { AuthContextProvider } from "./context/authContext";
import ExamplefetchData from "./pages/examplefetchData";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="calendarMonth" element={<CalendarMonth />}></Route>
            <Route path="event" element={<Event />}></Route>
            <Route path="signUp" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="fetch" element={<ExamplefetchData />}></Route>
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

//useNavigate - switch btw routes after clicking on it. import frm react router dom
