import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import { AuthContextProvider } from "./context/authContext";
import ExamplefetchData from "./pages/examplefetchData";
import MyEvents from "./pages/myEvents";
import { UserContextProvider } from "./context/userContext";
import { AllEventsContextProvider } from "./context/allEventsContext";
import CreateEventForm from "./components/myEvents/createEventForm";

function App() {
  return (
    <AuthContextProvider>
      <AllEventsContextProvider>
        <UserContextProvider>
          <Router>
            <Routes>
              <Route path="/">
                <Route index element={<Home />}></Route>
                <Route path="myEvents" element={<MyEvents />}></Route>
                <Route path="signUp" element={<SignUp />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route
                  path="createEventForm"
                  element={<CreateEventForm />}
                ></Route>
                <Route path="fetch" element={<ExamplefetchData />}></Route>
              </Route>
            </Routes>
          </Router>
        </UserContextProvider>
      </AllEventsContextProvider>
    </AuthContextProvider>
  );
}

export default App;

//useNavigate - switch btw routes after clicking on it. import frm react router dom
