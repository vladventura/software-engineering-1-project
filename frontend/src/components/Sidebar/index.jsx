import { connect } from "react-redux";
import {
  openAddEventModal,
  openAddNotifModal,
  openCreateModal,
} from "../../store/actions/modalActions";
import { CalendarPreview } from "../CalendarInfoPreview";
import { SidebarToggleCalendar } from "../SidebarToggleCalendar";
import "./index.css";

const SidebarComponent = ({
  allCalendars,
  openCreate,
  openAddEvent,
  openAddNotif,
}) => {
  const exportDisplayed = () => {
    window.print();
  };

  return (
    <div className="sidebar-container">
      <div className="calendar-preview-container">
        <CalendarPreview />
      </div>
      <div className="calendars-toggle-container">
        {allCalendars.map((c) => (
          <SidebarToggleCalendar calendar={c} key={`sidebar-${c.name}`} />
        ))}
      </div>
      <div className="sidebar-buttons-container">
        <button className="new-calendar-button" onClick={openCreate}>
          Create Calendar
        </button>
        <button className="add-event-button" onClick={openAddEvent}>
          Add Event
        </button>
        <button className="add-notification-button" onClick={openAddNotif}>
          Add Notification
        </button>
        <button className="save-calendar-button" onClick={exportDisplayed}>
          Export Displayed Calendars
        </button>
      </div>
    </div>
  );
};

const stateToProps = (state) => ({
  allCalendars: state.calendars.allCalendars,
});

const dispatchToProps = (dispatch) => ({
  openCreate: () => dispatch(openCreateModal()),
  openAddEvent: () => dispatch(openAddEventModal()),
  openAddNotif: () => dispatch(openAddNotifModal()),
});

export const Sidebar = connect(stateToProps, dispatchToProps)(SidebarComponent);
