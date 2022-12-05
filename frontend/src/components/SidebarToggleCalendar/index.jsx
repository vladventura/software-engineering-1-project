import "./index.css";
import { useState } from "react";
import { connect } from "react-redux";
import { toggleCalendar } from "../../store/actions/calendarActions";
import { getTextForColor } from "../../utils";

const SidebarToggleCalendarComponent = ({ calendar, toggleViewCalendar }) => {
  const [visible, setVisible] = useState(calendar.visible);
  const { name, color } = calendar;

  const changeChecked = () => {
    // KLUDGE: Ideally we don't need this
    // but I'm running out of time to debug
    setVisible(!visible);
    toggleViewCalendar(name);
  };

  const threedotClicked = () => {
    alert("Threedot clicked");
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
          class="fa-solid fa-ellipsis-vertical"
          style={{ color: getTextForColor(color) }}
        ></i>
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
