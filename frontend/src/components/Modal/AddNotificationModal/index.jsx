import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { connect } from "react-redux";
import { areEventsSimilar } from "../../../utils";
import { closeModal } from "../../../store/actions/modalActions";
import { createNotification } from "../../../store/actions/calendarActions";
import { ntpSelect, notifMethodList } from "../modalConsts";
import Select from "react-select";

export const AddNotificationModalComponent = ({
  close,
  allCalendars,
  targetEvent,
  create,
}) => {
  // Should work in theory
  const searchEventOnTarget = () => {
    let cal = 0;
    let ev = 0;
    let nt = false;
    if (targetEvent) {
      allCalendars.every((c, ci) => {
        if (c.name !== targetEvent.calendar) return false;
        c.events.every((e, ei) => {
          if (areEventsSimilar(e, targetEvent)) {
            cal = ci;
            ev = ei;
            nt = ev.notification;
            return true;
          }
          return false;
        });
        return true;
      });
    }
    return { cal, ev, nt };
  };

  const targetResult = searchEventOnTarget();

  const [calendarIndex, setCalendarIndex] = useState(targetResult.cal);
  const [eventIndex, setEventIndex] = useState(targetResult.ev);

  const [timePair, setTimePair] = useState(
    targetResult.nt?.time ?? ntpSelect[0]
  );
  const [notifMethod, setNotifMethod] = useState(
    targetResult.nt?.method ?? notifMethodList[0]
  );

  const calendarIndexOnChange = (e) => {
    setCalendarIndex(e.target.value);
  };

  const eventIndexOnChange = (e) => {
    setEventIndex(e.target.value);
  };

  const notifMethodOnChange = (e) => {
    setNotifMethod(e.target.value);
  };

  const submit = () => {
    const notification = {
      // Should mark for deletion before spreading into data store on action
      calendarIndex,
      eventIndex,
      method: notifMethod,
      time: timePair,
      eventName: allCalendars[calendarIndex].events[eventIndex].name,
    };
    create(notification);
    alert("Notification created!");
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
        <h1>Add Notification</h1>
      </div>
      <div className="body">
        <form className="create-notification-form">
          <label className="text">Which calendar is your event on?</label>
          <select id="notif-chosen-calendar" onChange={calendarIndexOnChange}>
            {allCalendars.map((n, i) => (
              <option
                key={`notif-calendar-chosen-option-${n.name}-${i}`}
                value={i}
              >
                {n.name}
              </option>
            ))}
          </select>
          {allCalendars[calendarIndex]?.events.length > 0 ? (
            <>
              <label className="text">Which one is your event?</label>
              <select id="notif-chosen-event" onChange={eventIndexOnChange}>
                {allCalendars[calendarIndex].events.map((n, i) => (
                  <option
                    key={`notif-event-chosen-option-${n.name}-${i}`}
                    value={i}
                  >
                    {n.name}
                  </option>
                ))}
              </select>
              <label className="text">Event Notification Method</label>
              <select id="notif-select-method" onChange={notifMethodOnChange}>
                {notifMethodList.map((nm) => (
                  <option key={`notif-method-${nm}`} value={nm}>
                    {nm}
                  </option>
                ))}
              </select>
              <label className="text">Notify Time Before</label>
              <Select
                options={ntpSelect}
                defaultValue={timePair}
                onChange={(e) => setTimePair(e.value)}
              />
            </>
          ) : (
            <div className="Text">No events in this calendar!</div>
          )}
        </form>
      </div>
      <div className="footer">
        <button onClick={close} id="cancelBtn">
          Cancel
        </button>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

const stateToProps = (state) => ({
  allCalendars: state.calendars.allCalendars,
});

const dispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
  create: (notif) => dispatch(createNotification(notif)),
});

export const AddNotificationModal = connect(
  stateToProps,
  dispatchToProps
)(AddNotificationModalComponent);
