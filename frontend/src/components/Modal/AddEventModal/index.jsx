import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { connect } from "react-redux";
import { closeModal } from "../../../store/actions/modalActions";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { createEvent } from "../../../store/actions/calendarActions";
import { notificationTimepair, notifMethodList } from "../modalConsts";

export const AddEventModalComponent = ({
  close,
  allCalendars,
  modalData,
  create,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(
    modalData ? new Date(modalData) : new Date()
  );
  const [time, setTime] = useState("10:00");
  const [calendarIndex, setCalendarIndex] = useState(0);

  const [useNotif, setUseNotif] = useState(false);
  // Same approach to calendars
  const [notifIndex, setNotifIndex] = useState(0);
  const [notifMethod, setNotifMethod] = useState(notifMethodList[0]);

  const dropdownChange = (e) => {
    setCalendarIndex(e.target.value);
  };

  const submit = () => {
    const targetCalendar = allCalendars[calendarIndex];
    const { color } = targetCalendar;
    const number = date.getDate();
    const month = date.getMonth() + 1;
    const dateString = `${month}/${number}/${date.getFullYear()}`;

    // Do not rename properties
    const event = {
      name,
      date: dateString,
      number,
      month,
      dueTime: time,
      description,
      calendar: targetCalendar.name,
      color,
    };
    if (useNotif)
      event["notification"] = {
        time: notificationTimepair[notifIndex],
        method: notifMethod,
      };
    create(event);
    alert("Event Created!");
    close();
  };

  // React v18 groups these together ♥
  const checkUseNotif = () => {
    if (useNotif) {
      setNotifIndex(0);
      setNotifMethod(notifMethodList[0]);
    }
    setUseNotif(!useNotif);
  };

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
        <form className="create-event-form">
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
          <DatePicker
            selected={date}
            onChange={setDate}
            dateFormat="MM/dd/yyyy"
          />
          <label className="text">Event Time</label>
          <TimePicker
            value={time}
            onChange={setTime}
            className="time-picker"
            openClockOnFocus={false}
          />
          <label className="text">Event Calendar</label>
          <select id="event-chosen-calendar" onChange={dropdownChange}>
            {allCalendars.map((n, i) => (
              <option key={`event-chosen-option-${n.name}-${i}`} value={i}>
                {n.name}
              </option>
            ))}
          </select>
          <div className="use-notif-container">
            <div className="use-notif-banner">
              <label htmlFor="use-notif-check" className="text">
                Use Notification
              </label>
              <input
                id="use-notif-check"
                className="use-notification-checkmark"
                checked={useNotif}
                onChange={checkUseNotif}
                type="checkbox"
              />
            </div>
            {/* This is not good */}
            {useNotif && (
              <label className="text">Event Notification Method</label>
            )}
            {useNotif && (
              <select id="notif-select-method">
                {notifMethodList.map((nm) => (
                  <option key={`notif-method-${nm}`} value={nm}>
                    {nm}
                  </option>
                ))}
              </select>
            )}
            {useNotif && <label className="text">Notify Time Before</label>}
            {useNotif && (
              <select id="notif-select-method">
                {notificationTimepair.map((tp, i) => (
                  <option key={`notif-method-${i}`} value={i}>
                    {`${tp.time}${tp.measure}`}
                  </option>
                ))}
              </select>
            )}
          </div>
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

const stateToProps = (state) => ({
  allCalendars: state.calendars.allCalendars,
  modalData: state.modal.modalData,
});

const dispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
  create: (evnt) => dispatch(createEvent(evnt)),
});

export const AddEventModal = connect(
  stateToProps,
  dispatchToProps
)(AddEventModalComponent);
