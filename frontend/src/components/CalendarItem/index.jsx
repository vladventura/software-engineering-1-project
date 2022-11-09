import "./index.css";

export const CalendarItem = ({ number, events = [], isToday = false }) => {
  return (
    <div className="calendar-item">
      <div className={`calendar-item-number ${isToday ? "today" : ""}`}>
        {number}
      </div>
    </div>
  );
};
