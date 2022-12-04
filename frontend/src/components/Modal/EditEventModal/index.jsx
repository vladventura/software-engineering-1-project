import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { connect } from "react-redux";
import { closeModal } from "../../../store/actions/modalActions";
import {
  findIndexOfTimepair,
  notificationTimepair,
  notifMethodList,
} from "../modalConsts";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { editEvent } from "../../../store/actions/calendarActions";

const EditEventModalComponent = ({ close, edit, modalData: incomingEvent }) => {
  const [name, setName] = useState(incomingEvent.name);
  const [description, setDescription] = useState(incomingEvent.description);
  const [date, setDate] = useState(new Date(incomingEvent.date));
  const [time, setTime] = useState(incomingEvent.dueTime);
  const [useNotif, setUseNotif] = useState(
    incomingEvent.notification &&
      Object.keys(incomingEvent.notification).length > 0
      ? true
      : false
  );

  // Same approach to calendars
  const [notifTimepairIndex, setNotifTimepairIndex] = useState(
    findIndexOfTimepair(useNotif ? incomingEvent.notification.time : 0)
  );
  const [notifMethod, setNotifMethod] = useState(
    useNotif ? incomingEvent.notification.method : notifMethodList[0]
  );

  const submit = () => {
    const targetCalendar = incomingEvent.calendar;
    const color = incomingEvent.color;
    const number = date.getDate();
    const month = date.getMonth() + 1;
    const dateString = `${month}/${number}/${date.getFullYear()}`;

    // Do not rename properties
    const event = {
      name,
      number,
      month,
      description,
      color,
      // Marked for deletion on next step
      oldVersion: incomingEvent,
      date: dateString,
      dueTime: time,
      calendar: targetCalendar,
    };
    if (useNotif)
      event["notification"] = {
        time: notificationTimepair[notifTimepairIndex],
        method: notifMethod,
      };
    console.log(event);
    edit(event);
    alert("Event Edited!");
    close();
  };

  // React v18 groups these together ♥
  const checkUseNotif = () => {
    if (useNotif) {
      setNotifTimepairIndex(0);
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
        <h1>Edit Event</h1>
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
          <div id="event-chosen-calendar" className="text">
            {incomingEvent.calendar}
          </div>
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
  edit: (event) => dispatch(editEvent(event)),
});

export const EditEventModal = connect(
  stateToProps,
  dispatchToProps
)(EditEventModalComponent);
