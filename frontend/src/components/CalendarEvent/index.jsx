import "./index.css";

export const CalendarEvent = ({ dueTime, name, official }) => <div className="calendar-event">
    <p className="calendar-event-due">{dueTime}</p>
    <p className="calendar-event-name">{name}</p>
    {official && <div className="calendar-event-official"></div>}
</div>;
