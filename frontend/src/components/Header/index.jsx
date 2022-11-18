import logo from "../../assets/uml_logo.png";
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
    </div>
  );
};
