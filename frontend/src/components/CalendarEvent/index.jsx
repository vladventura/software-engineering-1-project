import "./index.css";

export const CalendarEvent = ({ dueTime, name, official, description }) => {
  const eventOnClick = () => {
    alert("Event Info " + description);
  };
  return (
    <div className="calendar-event" onClick={eventOnClick}>
      <p className="calendar-event-due">{dueTime}</p>
      <p className="calendar-event-name">{name}</p>
      {official && <p className="calendar-event-official">📓</p>}
    </div>
  );
};
