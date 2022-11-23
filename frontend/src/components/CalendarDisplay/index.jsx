import personalCalendar from "../../mocks/calendar";
import { CalendarDay } from "./CalendarDay";
import "./index.css";

export const CalendarDisplay = ({ viewCal }) => {
  // Calendar should filter
  return (
    <div className="grid-container">
      {personalCalendar.days.map((d) => (
        <CalendarDay
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
