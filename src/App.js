import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/signUp";
import Login from "./pages/login";
import MyEvents from "./pages/myEvents";
import CreateEventForm from "./components/forms/createEventForm";
import NotificationModal from "./components/modals/notificationModal";
import EventDetailsModal from "./components/modals/eventDetailsModal";
// import ExamplefetchData from "./forDevelopmentOnly/examplefetchData";

function App() {
  return (
    <>
      <NotificationModal />
      <EventDetailsModal />

      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="myEvents" element={<MyEvents />}></Route>
            <Route path="signUp" element={<SignUp />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="createEventForm" element={<CreateEventForm />}></Route>
            {/* <Route path="fetch" element={<ExamplefetchData />}></Route> */}
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
