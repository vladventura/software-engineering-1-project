// import { useState } from "react";
import "./index.css";

export const SidebarToggleCalendar = ({
  name,
  color,
  onCalendarToggled,
  calendarToggled,
}) => {
  //   const [checked, setChecked] = useState(calen);

  const changeChecked = () => {
    // setChecked(!checked);
    onCalendarToggled?.(name);
  };

  return (
    <div
      className="calendar-toggle"
      onClick={changeChecked}
      style={{ backgroundColor: color }}
    >
      <input
        className="calendar-toggle-checkmark"
        checked={calendarToggled}
        onChange={changeChecked}
        type="checkbox"
      />
      <div className="calendar-toggle-name">{name}</div>
    </div>
  );
};
