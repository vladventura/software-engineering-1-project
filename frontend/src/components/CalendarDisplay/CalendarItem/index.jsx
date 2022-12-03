import { CalendarEvent } from "./CalendarEvent";
import "./index.css";

export const CalendarItem = ({
  number,
  events = [],
  isToday = false,
  month,
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
        {events.map((e) => (
          <CalendarEvent event={e} key={`event-${e.name}-${e.calendar}`} />
        ))}
      </div>
    </div>
  );
};
