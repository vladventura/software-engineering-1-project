import "./index.css";
import { CalendarItem } from "./CalendarItem";
import { connect } from "react-redux";

const CalendarDisplayComponent = ({
  allCalendars,
  daysInMonth,
  selectedMonth,
  selectedDay,
}) => {
  const viewableEvents = [];
  allCalendars.forEach((c) => {
    if (c.visible) {
      c.events.forEach((e) => {
        if (e.month === selectedMonth) viewableEvents.push(e);
      });
    }
  });

  const eventsPerDay = {};
  viewableEvents.map((e) =>
    eventsPerDay[e.number]
      ? eventsPerDay[e.number].push(e)
      : (eventsPerDay[e.number] = [e])
  );

  return (
    <div className="grid-container">
      {[...Array(daysInMonth)].map((d, i) => (
        <CalendarItem
          number={i + 1}
          key={`calendar-${i + 1}-day`}
          events={eventsPerDay[i + 1]}
          month={selectedMonth}
          isToday={selectedDay === i + 1}
        />
      ))}
    </div>
  );
};

const stateToProps = (state) => {
  return {
    allCalendars: state.calendars.allCalendars,
    daysInMonth: state.calendars.daysInMonth,
    selectedMonth: state.calendars.selectedMonth,
    selectedDay: state.calendars.selectedDay,
  };
};

export const CalendarDisplay = connect(stateToProps)(CalendarDisplayComponent);
