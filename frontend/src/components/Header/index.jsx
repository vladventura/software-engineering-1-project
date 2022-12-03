import logo from "../../assets/uml_logo.png";
import avatar from "../../assets/avatar.png";
import "./index.css";

export const Header = () => {
  const avatarOnClick = () => {
    alert("Please make-believe that this is a proper user status pop-up");
  };

  const logoOnClick = () => {
    window.open("https://uml.edu", "_blank", "noreferrer");
  };

  return (
    <div className="header-container">
      <img
        src={logo}
        alt="School Logo"
        className="school-logo clickable-img"
        onClick={logoOnClick}
      />
      <div className="month-name-container">
        <div className="month-name">November</div>
        <div className="month-arrows">
          <button>{"<"}</button>
          <button>{">"}</button>
        </div>
      </div>
      <div className="display-mode-change-container">
        <form>
          <select id="modes">
            <option value="mth">Month</option>
            <option value="day">Day</option>
            <option value="wk">Week</option>
          </select>
        </form>
      </div>
      <div className="avatar-container">
        <img
          src={avatar}
          alt="User Avatar"
          className="avatar-picture clickable-img"
          onClick={avatarOnClick}
        />
        <div className="student-name">Student Name</div>
      </div>
    </div>
  );
};
