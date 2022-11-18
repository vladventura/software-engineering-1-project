import logo from "../../assets/uml_logo.png";
import avatar from "../../assets/avatar.png";
import "./index.css";

export const Header = () => {
  return (
    <div className="header-container">
      <a
        className="school-logo-link"
        href="https://uml.edu"
        rel="noreferrer"
        target="_blank"
      >
        <img src={logo} alt="School Logo" className="school-logo" />
      </a>
      <a
        className="avatar-link"
        href="https://uml.edu"
        rel="noreferrer"
        target="_blank"
      >
        <img src={avatar} alt="User Avatar" className="avatar-picture" />
      </a>
    </div>
  );
};
