import "./index.css";
import { useState } from "react";
import { connect } from "react-redux";
import {
  editCalendar,
  deleteCalendar,
} from "../../../store/actions/calendarActions";
import { closeModal } from "../../../store/actions/modalActions";
import { ChromePicker as Picker } from "react-color";

const EditCalendarModalComponent = ({ close, edit, modalData, remove }) => {
  const [name, setName] = useState(modalData.name);
  const [color, setColor] = useState({
    hex: modalData.color,
  });
  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const submit = () => {
    // Should verify if name empty and flashbar/alert addequately
    if (name === "" || color.hex.toString() === "")
      alert("Color and name are required");
    else {
      edit(name, color.hex, modalData.name);
      alert("Calendar Edited!");
      close();
    }
  };

  const removeCalendar = () => {
    remove(modalData.name);
    alert("Calendar Deleted!");
    close();
  };

  return (
    <div className="modalContainer">
      <div className="titleCloseBtn">
        <button className="text" onClick={close}>
          X
        </button>
      </div>
      <div className="title text">
        <h1>Edit Calendar</h1>
      </div>
      <div className="body">
        <form className="edit-calendar-form">
          <label className="text" htmlFor="cal-name">
            Calendar Name
          </label>
          <input
            id="cal-name"
            name="cal-name"
            className="cal-name"
            value={name}
            onChange={onChangeName}
          />
          <label className="text">Color Picker</label>
          <Picker color={color} onChange={(c, e) => setColor(c)} />
        </form>
      </div>
      <div className="footer">
        <button onClick={removeCalendar} id="cancelBtn">
          Delete
        </button>
        <button onClick={submit}>Continue</button>
      </div>
    </div>
  );
};

const stateToProps = (state) => ({ modalData: state.modal.modalData });

const dispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
  edit: (name, color) => dispatch(editCalendar(name, color)),
  remove: (name) => dispatch(deleteCalendar(name)),
});

export const EditCalendarModal = connect(
  stateToProps,
  dispatchToProps
)(EditCalendarModalComponent);
