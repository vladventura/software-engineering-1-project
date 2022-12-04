import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { connect } from "react-redux";
import { createCalendar } from "../../../store/actions/calendarActions";
import { closeModal } from "../../../store/actions/modalActions";
import DatePicker from "react-datepicker";

export const AddEventModalComponent = ({ close, create }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  const submit = () => {};

  return (
    <div className="modalContainer">
      <div className="titleCloseBtn">
        <button className="text" onClick={close}>
          X
        </button>
      </div>
      <div className="title text">
        <h1>Add Event</h1>
      </div>
      <div className="body">
        <form className="create-calendar-form">
          <label className="text" htmlFor="event-name">
            Event Name
          </label>
          <input
            id="event-name"
            name="event-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text" htmlFor="event-description">
            Event Description
          </label>
          <input
            id="event-description"
            name="event-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="text">Event Date</label>
          <DatePicker selected={date} onChange={(d) => setDate(d)} />
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

export const AddEventModal = connect(
  null,
  dispatchToProps
)(AddEventModalComponent);
