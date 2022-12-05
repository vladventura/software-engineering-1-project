import { connect } from "react-redux";
import { getWeekNumber } from "../../utils";
import "./index.css";

const CalendarPreviewComponent = ({
  selectedDate,
  monthName,
  selectedYear,
  allCalendars,
}) => {
  const weekNumber = getWeekNumber(selectedDate);
  const allEvents = allCalendars.map((c) => c.events).flat();
  const eventsThisMonth = allEvents.filter(
    (e) => e.month === selectedDate.getMonth() + 1
  );
  const gradedEvents = eventsThisMonth.filter((e) => e.official);

  const pastDue = gradedEvents.filter((e) => new Date(e.date) < selectedDate);

  const secondDay = new Date(selectedDate);
  secondDay.setDate(secondDay.getDate() + 1);
  const thirdDay = new Date(secondDay);
  thirdDay.setDate(thirdDay.getDate() + 1);
  const itemsDueSoon = gradedEvents.filter(
    (e) =>
      e.date === selectedDate.toLocaleDateString("en-US") ||
      e.date === secondDay.toLocaleDateString("en-US") ||
      e.date === thirdDay.toLocaleDateString("en-US")
  );

  const submittedEvents = gradedEvents.filter((e) => e.submitted);

  return (
    <div className="calendar-preview-frame">
      <p>
        {monthName}, {selectedYear}: Week #{weekNumber}
      </p>
      <p>
        <span>{gradedEvents.length}</span> total graded coursework
      </p>
      {pastDue.length > 0 && (
        <p>
          <span>{pastDue.length}</span> past due!
        </p>
      )}
      {itemsDueSoon.length > 0 && (
        <p>
          <span>{itemsDueSoon.length}</span> due in the next 3 days
        </p>
      )}
      <p>
        <span>{gradedEvents.length - submittedEvents.length}</span> remaining to
        submit
      </p>
    </div>
  );
};

const stateToProps = (state) => ({
  selectedDate: state.calendars.selectedDate,
  monthName: state.calendars.monthName,
  selectedYear: state.calendars.selectedYear,
  allCalendars: state.calendars.allCalendars,
});

export const CalendarPreview = connect(stateToProps)(CalendarPreviewComponent);
