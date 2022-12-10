import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Switch from "react-switch";
import Home from "./pages/home";
import CalendarMonth from "./pages/calendarMonth";
import Event from "./pages/event";
import { ExampleCartContextProvider } from "./context/example_CartContext";

function App() {
  return (

    <Router>
    <ExampleCartContextProvider>

        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="calendarMonth" element={<CalendarMonth />}></Route>
            <Route path="event" element={<Event />}></Route>
          </Route>
        </Routes>
    </ExampleCartContextProvider>
    </Router>

  );
}

export default App;
