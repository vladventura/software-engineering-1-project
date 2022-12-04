import "./index.css";
import { getTextForColor } from "../../../../utils";
import { connect } from "react-redux";
import { openEditEventModal } from "../../../../store/actions/modalActions";

const CalendarEventComponent = ({ event, openEdit }) => {
  const { name, dueTime, official, color } = event;
  const eventOnClick = () => {
    if (!official) openEdit(event);
    // else openPreview(event)
  };
  return (
    <div
      className="calendar-event"
      onClick={eventOnClick}
      style={{ backgroundColor: color, color: getTextForColor(color) }}
    >
      <p className="calendar-event-due">{dueTime}</p>
      <p className="calendar-event-name">{name}</p>
      {official && <p className="calendar-event-official">📓</p>}
    </div>
  );
};

const dispatchToProps = (dispatch) => ({
  openEdit: (data) => dispatch(openEditEventModal(data)),
  // openPreview: (data) => dispatch(openPreviewEventModal(data))
});

export const CalendarEvent = connect(
  null,
  dispatchToProps
)(CalendarEventComponent);
