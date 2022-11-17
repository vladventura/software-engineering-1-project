import personalCalendar from "../../mocks/calendar";
import { CalendarItem } from "../CalendarItem";
import "./index.css";

export const CalendarDisplay = () => {
  return (
    <div className="grid-container">
      {personalCalendar.days.map((d) => (
        <CalendarItem number={d.number} isToday={false} events={d.events} />
      ))}
    </div>
  );
};
