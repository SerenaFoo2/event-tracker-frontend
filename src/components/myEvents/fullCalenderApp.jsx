import { useRef, useState, useContext } from "react";
import RemoveEventModal from "./removeEventModal";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { AllEventsContext } from "../../context/allEventsContext";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import UpdateEventDateModal from "./updateEventDateModal";

export default function FullCalenderApp() {
  const calenderRef = useRef(null);

  // use in <RemoveEventModal>
  const defaultSelectedEvent = {
    event: {},
    modalOpen: false,
  };

  const defaultNewEventDates = {
    changeInfo: "",
    modalOpen: false,
  };

  const [selectedEvent, setSelectedEvent] = useState(defaultSelectedEvent);
  const [newEventDates, setNewEventDates] = useState(defaultNewEventDates);

  const { role, savedEvents } = useContext(UserContext).userInfo;
  const { allEvents } = useContext(AllEventsContext);

  const navigate = useNavigate();

  // open modal for <RemoveEventModal>
  function handleEventClick(eventClickInfo) {
    setSelectedEvent((prev) => {
      return { ...prev, modalOpen: true, event: eventClickInfo.event };
    });
    // let calendarApi = calenderRef.current.getApi();
    // console.log(calendarApi.getEvents(), "calendarApi");
  }

  // open modal for <UpdateEventDateModal>
  function handleEventDateChange(changeInfo) {
    setNewEventDates((prev) => {
      return {
        ...prev,
        modalOpen: true,
        changeInfo: changeInfo,
      };
    });
  }

  // function handleNewDatesSelection(selectionInfo) {
  //   const newStartDateTime = selectionInfo.startStr;
  //   const newEndDateTime = selectionInfo.endStr;
  //   console.log("selectionInfo: ", selectionInfo);
  //   console.log("newStartDate: ", newStartDateTime, typeof newStartDateTime);
  //   console.log("newEndDate: ", newEndDateTime, typeof newEndDateTime);
  // }

  return (
    <div>
      <RemoveEventModal
        modalOpen={selectedEvent.modalOpen}
        event={selectedEvent.event}
        setSelectedEvent={setSelectedEvent}
      />
      <UpdateEventDateModal
        modalOpen={newEventDates.modalOpen}
        changeInfo={newEventDates.changeInfo}
        setNewEventDates={setNewEventDates}
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView="dayGridMonth"
        customButtons={{
          addEventButton: {
            text: "Add Event",
            click: () => {
              navigate("/createEventForm");
            },
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
        navLinks={true} // allows to click day/week names to navigate views
        eventClick={handleEventClick} //TODO for admin mode, make it delete event from /events
        nowIndicator={true}
        // selectable={role === "admin" ? true : false}
        // select={handleNewDatesSelection}  // select a range of date/days, controlled by "selectable"
        editable={role === "admin" ? true : false}
        eventChange={handleEventDateChange} // controlled by "editable"
      ></FullCalendar>
    </div>
  );
}
