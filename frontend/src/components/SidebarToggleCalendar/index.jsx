import { connect } from "react-redux";
import { toggleCalendar } from "../../store/actions/calendarActions";
import "./index.css";

const SidebarToggleCalendarComponent = ({ calendar, toggleViewCalendar }) => {
  const { name, color, visible } = calendar;

  const changeChecked = () => {
    toggleViewCalendar(name);
  };

  return (
    <div
      className="calendar-toggle"
      onClick={changeChecked}
      style={{ backgroundColor: color }}
    >
      <input
        className="calendar-toggle-checkmark"
        checked={visible}
        onChange={changeChecked}
        type="checkbox"
      />
      <div className="calendar-toggle-name">{name}</div>
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
