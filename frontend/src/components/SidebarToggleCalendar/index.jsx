import "./index.css";
import { useState } from "react";
import { connect } from "react-redux";
import { toggleCalendar } from "../../store/actions/calendarActions";
import { getTextForColor } from "../../utils";
import { openEditCalendarModal } from "../../store/actions/modalActions";

const SidebarToggleCalendarComponent = ({
  calendar,
  toggleViewCalendar,
  openEdit,
}) => {
  const [visible, setVisible] = useState(calendar.visible);
  const { name, color } = calendar;

  const changeChecked = () => {
    // KLUDGE: Ideally we don't need this
    // but I'm running out of time to debug
    setVisible(!visible);
    toggleViewCalendar(name);
  };

  const threedotClicked = () => {
    openEdit(calendar);
  };

  return (
    <div className="calendar-toggle" style={{ backgroundColor: color }}>
      <input
        className="calendar-toggle-checkmark"
        checked={visible}
        onChange={changeChecked}
        type="checkbox"
      />
      <div
        className="calendar-toggle-name"
        onClick={changeChecked}
        style={{ color: getTextForColor(color) }}
      >
        {name}
      </div>
      <div className="calendar-toggle-threedot" onClick={threedotClicked}>
        <i
          className="fa-solid fa-ellipsis-vertical"
          style={{ color: getTextForColor(color) }}
        ></i>
      </div>
    </div>
  );
};

const dispatchToProps = (dispatch) => ({
  toggleViewCalendar: (name) => dispatch(toggleCalendar(name)),
  openEdit: (calendar) => dispatch(openEditCalendarModal(calendar)),
});

export const SidebarToggleCalendar = connect(
  null,
  dispatchToProps
)(SidebarToggleCalendarComponent);
