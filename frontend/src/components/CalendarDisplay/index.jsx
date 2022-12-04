import "./index.css";
import { CalendarItem } from "./CalendarItem";
import { connect } from "react-redux";

const CalendarDisplayComponent = ({
  allCalendars,
  daysInMonth,
  selectedMonth,
  selectedYear,
}) => {
  const viewableEvents = [];
  allCalendars.forEach((c) => {
    if (c.visible) {
      c.events.forEach((e) => {
        const splt = e.date.split("/");
        const incomingYear = splt[2];

        if (
          e.month === selectedMonth &&
          incomingYear === selectedYear.toString()
        )
          viewableEvents.push(e);
      });
    }
  });

  // Not good
  // Opportunity to use dynamic programming
  const today = new Date();

  const checkIsToday = (i) => {
    if (selectedMonth !== today.getMonth() + 1) return false;
    if (selectedYear !== today.getFullYear()) return false;
    if (i !== today.getDate()) return false;
    return true;
  };

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
          isToday={checkIsToday(i)}
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
    selectedYear: state.calendars.selectedYear,
  };
};

export const CalendarDisplay = connect(stateToProps)(CalendarDisplayComponent);
