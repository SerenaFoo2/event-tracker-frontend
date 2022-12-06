import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CalenderMonth from "./pages/calenderMonth";
import CalenderDay from "./pages/calenderDay";
import Event from "./pages/event";
import { ExampleCartContextProvider } from "./context/example_CartContext";

function App() {
  return (
    <ExampleCartContextProvider>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="calenderMonth" element={<CalenderMonth />}></Route>
            <Route path="calenderDay" element={<CalenderDay />}></Route>
            <Route path="event" element={<Event />}></Route>
          </Route>
        </Routes>
      </Router>
    </ExampleCartContextProvider>
  );
}

export default App;
