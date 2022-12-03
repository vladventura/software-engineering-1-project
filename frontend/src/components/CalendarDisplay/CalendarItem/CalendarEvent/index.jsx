import "./index.css";

export const CalendarEvent = ({ event }) => {
  const { description, name, dueTime, official, color } = event;
  const eventOnClick = () => {
    alert("Event Info " + description);
  };
  return (
    <div
      className="calendar-event"
      onClick={eventOnClick}
      style={{ backgroundColor: color }}
    >
      <p className="calendar-event-due">{dueTime}</p>
      <p className="calendar-event-name">{name}</p>
      {official && <p className="calendar-event-official">📓</p>}
    </div>
  );
};
