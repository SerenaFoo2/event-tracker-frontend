import { useRef, useState, useContext } from "react";
import RemoveEventModal from "./removeEventModal";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { AllEventsContext } from "../../context/allEventsContext";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import listPlugin from "@fullcalendar/list";

export default function FullCalenderApp() {
  const calenderRef = useRef(null);

  // use in <RemoveEventModal>
  const defaultSelectedEvent = {
    event: {},
    modalOpen: false,
  };
  const [selectedEvent, setSelectedEvent] = useState(defaultSelectedEvent);

  const { role, savedEvents } = useContext(UserContext).userInfo;
  const { allEvents, setAllEvents } = useContext(AllEventsContext);

  function handleEventClick(eventClickInfo) {
    // open modal and update "selectedEvent" state used in <RemoveEventModal>
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: true, event: eventClickInfo.event };
    });
    // console.log("eventClick: ", eventClickInfo);
    // let calendarApi = calenderRef.current.getApi();
    // console.log(calendarApi.getEvents(), "calendarApi");
  }

  return (
    <div>
      <Link to="/">Back to Home Page</Link>

      <RemoveEventModal
        modalOpen={selectedEvent.modalOpen}
        event={selectedEvent.event}
        setSelectedEvent={setSelectedEvent}
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        customButtons={{
          addEventButton: {
            text: "Add Event",
            // click: () => console.log("new event"),
          },
        }}
        headerToolbar={{
          left: "prev,next today",
          center: `title`,
          right: `${
            role === "admin"
              ? "addEventButton dayGridMonth,timeGridWeek,timeGridDay,listWeek"
              : "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
          }`,
        }}
        events={role === "admin" ? allEvents : savedEvents}
        eventTimeFormat={{
          hour: "numeric",
          meridiem: "short",
        }}
        ref={calenderRef}
        weekNumbers={true}
        navLinks={true} // can click day/week names to navigate views
        eventClick={handleEventClick} //TODO for admin mode, make it delete event from /events
        nowIndicator={true}
        selectable={role === "admin" ? true : false}
        select={(selectionInfo) => {
          const newStartDate = selectionInfo.startStr;
          const newEndDate = selectionInfo.endStr;
          console.log("selectionInfo: ", selectionInfo);
          console.log("newStartDate, newEndDate", newStartDate, newEndDate);
        }} //!admin mode only, select a range of date/days // controlled by "editable"
        editable={role === "admin" ? true : false}
        eventChange={(changeInfo) => {
          //!admin mode only.
          const newStartDate = changeInfo.event.startStr;
          const newEndDate = changeInfo.event.endStr;
          console.log("some event has changed.", changeInfo);
          console.log("newStartDate, newEndDate", newStartDate, newEndDate);
          changeInfo.revert(); //revert back to original.
        }} // controlled by "editable"
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
