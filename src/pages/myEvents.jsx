import FullCalenderApp from "../components/myEvents/fullCalenderApp";
import NavigationBar from "../components/navigationBar";
import Footer from "../components/footer";

export default function MyEvents() {
  return (
    <div>
      <NavigationBar />
      <FullCalenderApp />
      <Footer />
    </div>
  );
}
