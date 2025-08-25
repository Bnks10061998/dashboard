// import React, { useState } from "react";
// import {
//   Calendar,
//   dateFnsLocalizer,
// } from "react-big-calendar";
// import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import { enUS } from "date-fns/locale";
// import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const DnDCalendar = withDragAndDrop(Calendar);

// const locales = {
//   "en-US": enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const CalendarPage = () => {
//   const [events, setEvents] = useState([
//     {
//       title: "Client Meeting",
//       start: new Date(2025, 4, 10, 10, 0),
//       end: new Date(2025, 4, 10, 11, 0),
//     },
//     {
//       title: "Design Review",
//       start: new Date(2025, 4, 11, 14, 0),
//       end: new Date(2025, 4, 11, 15, 0),
//     },
//   ]);

//   const eventStyleGetter = (event) => {
//     const backgroundColor = event.title.toLowerCase().includes("meeting")
//       ? "#1e90ff"
//       : "#28a745";

//     return {
//       style: {
//         backgroundColor,
//         borderRadius: "5px",
//         opacity: 0.9,
//         color: "white",
//         border: "none",
//         padding: "4px",
//       },
//     };
//   };

//   const handleSlotSelect = ({ start, end }) => {
//     const title = prompt("Enter Event Title:");
//     if (title && title.trim()) {
//       setEvents([...events, { title, start, end }]);
//     }
//   };

//   const handleEventDrop = ({ event, start, end }) => {
//     const updated = events.map((e) =>
//       e === event ? { ...e, start, end } : e
//     );
//     setEvents(updated);
//   };

//   const handleEventResize = ({ event, start, end }) => {
//     const updated = events.map((e) =>
//       e === event ? { ...e, start, end } : e
//     );
//     setEvents(updated);
//   };

//   const handleEventSelect = (event) => {
//     const action = window.prompt(
//       `Edit or delete event:\n\nCurrent Title: ${event.title}\n\nType new title to rename, or leave empty to delete:`
//     );
//     if (action === null) return; // Cancel
//     if (action.trim() === "") {
//       // Delete
//       setEvents(events.filter((e) => e !== event));
//     } else {
//       // Rename
//       setEvents(
//         events.map((e) =>
//           e === event ? { ...e, title: action.trim() } : e
//         )
//       );
//     }
//   };

//   return (
//     <div className="bg-[#1a3a8b] text-white min-h-screen p-6">
//       <h2 className="text-2xl font-semibold mb-6">📅 Calendar</h2>
//       <div className="bg-white rounded-lg p-4 text-black shadow-lg">
//         <DnDCalendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           selectable={true}
//           resizable
//           onSelectSlot={handleSlotSelect}
//           onEventDrop={handleEventDrop}
//           onEventResize={handleEventResize}
//           onSelectEvent={handleEventSelect}
//           eventPropGetter={eventStyleGetter}
//           style={{ height: 600 }}
//         />
//       </div>
//     </div>
//   );
// };

// export default CalendarPage;

import React, { useEffect, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DnDCalendar = withDragAndDrop(Calendar);

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Your backend base URL — change if needed
const API_BASE_URL = "http://localhost:5000";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  // Helper: convert date strings to Date objects for react-big-calendar
  const parseEventsDates = (events) => {
    return events.map((evt) => ({
      ...evt,
      start: new Date(evt.start),
      end: new Date(evt.end),
    }));
  };

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/events`)
      .then((res) => setEvents(parseEventsDates(res.data)))
      .catch(() => toast.error("Failed to load events."));
  }, []);

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: "#1e90ff",
      borderRadius: "5px",
      opacity: 0.9,
      color: "white",
      border: "none",
      padding: "4px",
    },
  });

  const handleSlotSelect = async ({ start, end }) => {
    const title = prompt("Enter Event Title:");
    if (title?.trim()) {
      const newEvent = {
        title: title.trim(),
        start: start.toISOString(),
        end: end.toISOString(),
      };
      try {
        const res = await axios.post(`${API_BASE_URL}/api/events`, newEvent);
        setEvents((prev) => [...prev, { ...res.data, start: new Date(res.data.start), end: new Date(res.data.end) }]);
        toast.success("Event created.");
      } catch {
        toast.error("Failed to create event.");
      }
    }
  };

  const handleEventDrop = async ({ event, start, end }) => {
    const updatedEvent = {
      ...event,
      start: start.toISOString(),
      end: end.toISOString(),
    };
    try {
      await axios.put(`${API_BASE_URL}/api/events/${event._id}`, updatedEvent);
      setEvents((prev) =>
        prev.map((e) =>
          e._id === event._id ? { ...updatedEvent, start: start, end: end } : e
        )
      );
      toast.info("Event moved.");
    } catch {
      toast.error("Failed to move event.");
    }
  };

  const handleEventResize = async ({ event, start, end }) => {
    const updatedEvent = {
      ...event,
      start: start.toISOString(),
      end: end.toISOString(),
    };
    try {
      await axios.put(`${API_BASE_URL}/api/events/${event._id}`, updatedEvent);
      setEvents((prev) =>
        prev.map((e) =>
          e._id === event._id ? { ...updatedEvent, start: start, end: end } : e
        )
      );
      toast.info("Event resized.");
    } catch {
      toast.error("Failed to resize event.");
    }
  };

  const handleEventSelect = async (event) => {
    const action = window.prompt(
      `Edit or delete event:\n\nCurrent Title: ${event.title}\n\nType new title to rename, or leave empty to delete:`
    );
    if (action === null) return;

    if (action.trim() === "") {
      try {
        await axios.delete(`${API_BASE_URL}/api/events/${event._id}`);
        setEvents((prev) => prev.filter((e) => e._id !== event._id));
        toast.success("Event deleted.");
      } catch {
        toast.error("Failed to delete event.");
      }
    } else {
      const updatedEvent = { ...event, title: action.trim() };
      try {
        await axios.put(`${API_BASE_URL}/api/events/${event._id}`, updatedEvent);
        setEvents((prev) =>
          prev.map((e) =>
            e._id === event._id ? { ...e, title: action.trim() } : e
          )
        );
        toast.success("Event updated.");
      } catch {
        toast.error("Failed to update event.");
      }
    }
  };

  return (
    <div className="bg-[#1a3a8b] text-white min-h-screen p-6">
      <ToastContainer position="top-right" />
      <h2 className="text-2xl font-semibold mb-6">📅 Calendar</h2>
      <div className="bg-white rounded-lg p-4 text-black shadow-lg">
        <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          resizable
          onSelectSlot={handleSlotSelect}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          onSelectEvent={handleEventSelect}
          eventPropGetter={eventStyleGetter}
          style={{ height: 600 }}
        />
      </div>
    </div>
  );
};

export default CalendarPage;

