import { connect } from "react-redux";
import { openCreateModal } from "../../store/actions/modalActions";
import { SidebarToggleCalendar } from "../SidebarToggleCalendar";
import "./index.css";

const SidebarComponent = ({ allCalendars, openCreate }) => {
  const createCalendarOnClick = () => {
    // Just opens Modal for calendar creation
    openCreate();
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
        {allCalendars.map((c) => (
          <SidebarToggleCalendar calendar={c} key={`sidebar-${c.name}`} />
        ))}
      </div>
      <div className="sidebar-buttons-container">
        <button className="add-event-button" onClick={() => {}}>
          Create Event
        </button>
        <button className="add-notification-button" onClick={() => {}}>
          Create Notification
        </button>
        <button className="save-calendar-button" onClick={() => {}}>
          Export Calendar
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
});

export const Sidebar = connect(stateToProps, dispatchToProps)(SidebarComponent);
