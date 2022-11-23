import { CalendarEvent } from "./CalendarEvent";
import "./index.css";

export const CalendarItem = ({
  number,
  events = [],
  isToday = false,
  month,
  showEvents,
}) => {
  const itemOnDblClick = () => {
    alert(
      "Please make-believe this is an Add Event dialog for now on day " +
        number +
        " of month " +
        month
    );
  };
  return (
    <div className="calendar-item" onDoubleClick={itemOnDblClick}>
      <div className={`calendar-item-number ${isToday ? "today" : ""}`}>
        {number}
      </div>
      <div className="calendar-item-events-container">
        {showEvents && (
          <CalendarEvent
            dueTime={events[0].dueTime}
            name={events[0].name}
            official={events[0].official}
            description={events[0].description}
          />
        )}
      </div>
    </div>
  );
};
