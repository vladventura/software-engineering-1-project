import { useState } from "react";
import { connect } from "react-redux";
import { toggleCalendar } from "../../store/actions/calendarActions";
import "./index.css";

const SidebarToggleCalendarComponent = ({ calendar, toggleViewCalendar }) => {
  const [visible, setVisible] = useState(calendar.visible);
  const { name, color } = calendar;

  const changeChecked = () => {
    // KLUDGE: Ideally we don't need this
    // but I'm running out of time to debug
    setVisible(!visible);
    toggleViewCalendar(name);
  };

  return (
    <div className="calendar-toggle" style={{ backgroundColor: color }}>
      <input
        className="calendar-toggle-checkmark"
        checked={visible}
        onChange={changeChecked}
        type="checkbox"
      />
      <div className="calendar-toggle-name" onClick={changeChecked}>
        {name}
      </div>
    </div>
  );
};

const dispatchToProps = (dispatch) => ({
  toggleViewCalendar: (name) => dispatch(toggleCalendar(name)),
});

export const SidebarToggleCalendar = connect(
  null,
  dispatchToProps
)(SidebarToggleCalendarComponent);
