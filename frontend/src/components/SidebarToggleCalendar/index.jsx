import { useState } from "react";
import "./index.css";

export const SidebarToggleCalendar = ({ name, color }) => {
  const [checked, setChecked] = useState(true);

  const changeChecked = () => {
    setChecked(!checked);
  };

  return (
    <div
      className="calendar-toggle"
      onClick={changeChecked}
      style={{ backgroundColor: color }}
    >
      <input
        className="calendar-toggle-checkmark"
        checked={checked}
        onChange={changeChecked}
        type="checkbox"
      />
      <div className="calendar-toggle-name">{name}</div>
    </div>
  );
};
