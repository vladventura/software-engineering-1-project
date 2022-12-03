import { useState } from "react";
import { connect } from "react-redux";
import { createCalendar } from "../../../store/actions/calendarActions";
import { closeModal } from "../../../store/actions/modalActions";
import "./index.css";

export const CreateCalendarModalComponent = ({ close, create }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#fadfac");
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const submit = () => {
    // Should verify if name empty and flashbar/alert addequately
    if (name === "" || color === "") alert("Color and name are required");
    else create(name, color);
  };

  return (
    <div className="modalContainer">
      <div className="titleCloseBtn">
        <button onClick={close}>X</button>
      </div>
      <div className="title">
        <h1>Create Calendar</h1>
      </div>
      <div className="body">
        <form className="create-calendar-form">
          <label htmlFor="cal-name">Calendar Name</label>
          <input
            id="cal-name"
            name="cal-name"
            value={name}
            onChange={onChangeName}
          />
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
