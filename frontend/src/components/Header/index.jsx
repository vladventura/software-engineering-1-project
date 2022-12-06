import logo from "../../assets/uml_logo.png";
import avatar from "../../assets/avatar.png";
import "./index.css";
import { connect } from "react-redux";
import {
  getInitialInfo,
  goBackMonthly,
  goForwardMonthly,
} from "../../store/actions/calendarActions";

const HeaderComponent = ({
  goBackMonth,
  goForwardMonth,
  goToday,
  monthName,
  selectedYear,
}) => {
  const logoOnClick = () => {
    window.open("https://uml.edu", "_blank", "noreferrer");
  };

  return (
    <div className="header-container">
      <div className="school-logo-container">
        <img
          src={logo}
          alt="School Logo"
          className="school-logo clickable-img"
          onClick={logoOnClick}
        />
      </div>
      <div className="month-name-container">
        <div className="display-mode-change-container">
          <button className="go-today-button" onClick={goToday}>
            Today
          </button>
        </div>
        <div className="month-info-container">
          <div className="month-name-year-container">
            <p className="month-name">{monthName}</p>
            <p className="month-year">{selectedYear}</p>
          </div>
          <div className="month-arrows">
            <button className="control-arrows" onClick={goBackMonth}>
              {"<"}
            </button>
            <button className="control-arrows" onClick={goForwardMonth}>
              {">"}
            </button>
          </div>
        </div>
      </div>
      <div className="avatar-container">
        <img
          src={avatar}
          alt="User Avatar"
          className="avatar-picture clickable-img"
        />
        <div className="student-name">John Doe</div>
      </div>
    </div>
  );
};

const stateToProps = (state) => ({
  monthName: state.calendars.monthName,
  selectedYear: state.calendars.selectedYear,
});

const dispatchToProps = (dispatch) => ({
  goBackMonth: () => dispatch(goBackMonthly()),
  goForwardMonth: () => dispatch(goForwardMonthly()),
  goToday: () => dispatch(getInitialInfo()),
});

export const Header = connect(stateToProps, dispatchToProps)(HeaderComponent);
