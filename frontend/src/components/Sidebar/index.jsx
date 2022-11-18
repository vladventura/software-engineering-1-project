import { useState } from "react";
import { Modal } from "../Modal";
import { SidebarToggleCalendar } from "../SidebarToggleCalendar";
import "./index.css";

export const Sidebar = () => {
  const [calendars, addCalendar] = useState([
    { name: "Personal Calendar", color: "aquamarine" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [mTitle, setMTitle] = useState("");
  const [mBody, setMBody] = useState("");

  const createCalendarOnClick = () => {
    // alert("Please make-believe this is a create calendar pop-up");
    const newCalendar = { name: "Another new calendar", color: "yellow" };
    addCalendar([...calendars, newCalendar]);
  };

  const createEventOnClick = () => {
    setMTitle("Create Event");
    setMBody("Please make-believe this is a create event pop-up");
    setModalOpen(true);
  };

  const createNotificationOnClick = () => {
    alert("Please make-beleive this is a create notification pop-up");
  };

  return (
    <div className="sidebar-container">
      <div className="new-calendar-container">
        <button className="new-calendar-button" onClick={createCalendarOnClick}>
          Create Calendar
        </button>
      </div>
      <div className="calendar-preview-container">
        <div className="calendar-preview-frame">
          <p>Calendar Preview</p>
        </div>
      </div>
      <div className="calendars-toggle-container">
        {calendars.map((c) => (
          <SidebarToggleCalendar name={c.name} color={c.color} />
        ))}
      </div>
      <div className="sidebar-buttons-container">
        <button className="add-event-button" onClick={createEventOnClick}>
          Create Event
        </button>
        <button
          className="add-notification-button"
          onClick={createNotificationOnClick}
        >
          Create Notification
        </button>
      </div>
      {modalOpen && (
        <Modal setOpenModal={setModalOpen} title={mTitle} body={mBody} />
      )}
    </div>
  );
};
