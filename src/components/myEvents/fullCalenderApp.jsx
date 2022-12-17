import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
// import { formatDate } from "@fullcalendar/react";
import { useRef, useState } from "react";
import listPlugin from "@fullcalendar/list";
import RemoveEventModal from "./removeEventModal";
import { tempDatabase2 } from "../../temp_database2";
import { Link } from "react-router-dom";

export default function FullCalenderApp() {
  const calenderRef = useRef(null);

  // use in <RemoveEventModal>
  const defaultSelectedEvent = {
    event: {},
    modalOpen: false,
  };
  const [selectedEvent, setSelectedEvent] = useState(defaultSelectedEvent);

  function handleEventClick(eventClickInfo) {
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: true, event: eventClickInfo.event };
    });
    console.log(eventClickInfo, "eventClick");
    console.log(tempDatabase2);
    // console.log("title", eventClickInfo.event.title);

    let calendarApi = calenderRef.current.getApi();
    console.log(calendarApi.getEvents(), "calendarApi");
    console.log(calendarApi.getEvents()[6].extendedProps);
  }

  return (
    <div>
      <Link to="/">Back to Home Page</Link>
      <RemoveEventModal
        // open={selectedEvent.modalOpen}
        modalOpen={selectedEvent.modalOpen}
        // setOpen={setOpen}
        event={selectedEvent.event}
        setSelectedEvent={setSelectedEvent}
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: `title`,
          right: `dayGridMonth,timeGridWeek,timeGridDay,listWeek newButton`,
        }}
        events={[...events, ...tempDatabase2]}
        eventTimeFormat={{
          hour: "numeric",
          meridiem: "short",
        }}
        // selectable={true}
        // editable={true}
        ref={calenderRef}
        weekNumbers={true}
        navLinks={true} // can click day/week names to navigate views
        eventClick={handleEventClick}
        nowIndicator={true}
      ></FullCalendar>
    </div>
  );
}

const events = [
  {
    id: 1,
    title: "event 1",
    start: "2022-12-12T10:00:00",
    end: "2022-12-12T12:00:00",
    // textColor: "pink",
    // backgroundColor: "yellow",
    // borderColor: "green",
    // display: "list-item",
    // url: "www.gg.com", // when click is equals to http://localhost:3000/www.gg.com
  },
  {
    id: 2,
    title: "event 2",
    start: "2022-12-15T13:00:00",
    end: "2022-12-15T18:00:00",
  },
  {
    id: "2a",
    title: "event 2a",
    start: "2022-12-15T14:00:00",
    end: "2022-12-15T17:00:00",
  },
  {
    id: 3,
    title: "event 3",
    start: "2022-12-22",
    end: "2022-12-24",
  },
];
