import { connect } from "react-redux";
import { openAddEventModal } from "../../../store/actions/modalActions";
import { CalendarEvent } from "./CalendarEvent";
import "./index.css";

const CalendarItemComponent = ({
  number,
  events = [],
  isToday = false,
  dateString,
  openAddEvent,
}) => {
  const itemOnDblClick = () => {
    openAddEvent(dateString);
  };

  return (
    <div
      className={`calendar-item ${isToday ? "today" : ""}`}
      onDoubleClick={itemOnDblClick}
    >
      <div className="calendar-item-number">{number}</div>
      <div className="calendar-item-events-container">
        {events.map((e) => (
          <CalendarEvent event={e} key={`event-${e.name}-${e.calendar}`} />
        ))}
      </div>
    </div>
  );
};

const dispatchToProps = (dispatch) => ({
  openAddEvent: (dateString) => dispatch(openAddEventModal(dateString)),
});

export const CalendarItem = connect(
  null,
  dispatchToProps
)(CalendarItemComponent);
