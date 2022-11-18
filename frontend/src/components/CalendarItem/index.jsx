import { CalendarEvent } from "../CalendarEvent";
import "./index.css";

export const CalendarItem = ({ number, events = [], isToday = false }) => {
  return (
    <div className="calendar-item">
      <div className={`calendar-item-number ${isToday ? "today" : ""}`}>
        {number}
      </div>
      <div className="calendar-item-events-container">
        <CalendarEvent
          dueTime={events[0].dueTime}
          name={events[0].name}
          official={events[0].official}
          description={events[0].description}
        />
      </div>
    </div>
  );
};
