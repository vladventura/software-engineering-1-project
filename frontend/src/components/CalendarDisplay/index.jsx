import personalCalendar from "../../mocks/calendar";
import { CalendarItem } from "../CalendarItem";
import "./index.css";

export const CalendarDisplay = ({ viewCal }) => {
  return (
    <div className="grid-container">
      {personalCalendar.days.map((d) => (
        <CalendarItem
          number={d.number}
          isToday={false}
          events={d.events}
          month={d.month}
          showEvents={viewCal}
        />
      ))}
    </div>
  );
};
