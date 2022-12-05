import "./index.css";
import { useState } from "react";
import { connect } from "react-redux";
import { createCalendar } from "../../../store/actions/calendarActions";
import { closeModal } from "../../../store/actions/modalActions";
import { ChromePicker as Picker } from "react-color";

export const CreateCalendarModalComponent = ({ close, create }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState({
    hex:
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, 0),
  });
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const submit = () => {
    // Should verify if name empty and flashbar/alert addequately
    if (name === "" || color.hex.toString() === "")
      alert("Color and name are required");
    else {
      create(name, color.hex);
      alert("Calendar Created!");
      close();
    }
  };

  return (
    <div className="modalContainer">
      <div className="titleCloseBtn">
        <button className="text" onClick={close}>
          X
        </button>
      </div>
      <div className="title text">
        <h1>Create Calendar</h1>
      </div>
      <div className="body">
        <form className="create-calendar-form">
          <label className="text" htmlFor="cal-name">
            Calendar Name
          </label>
          <input
            id="cal-name"
            name="cal-name"
            value={name}
            onChange={onChangeName}
          />
          <label className="text">Color Picker</label>
          <Picker color={color} onChange={(c, e) => setColor(c)} />
        </form>
      </div>
      <div className="footer">
        <button onClick={close} id="cancelBtn">
          Cancel
        </button>
        <button onClick={submit}>Continue</button>
      </div>
    </div>
  );
};

const dispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
  create: (name, color) => dispatch(createCalendar(name, color)),
});

export const CreateCalendarModal = connect(
  null,
  dispatchToProps
)(CreateCalendarModalComponent);
