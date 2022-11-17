import logo from "../../assets/uml_logo.png";
import "./index.css";

export const Header = () => {
  return (
    <div className="header-container">
      <img src={logo} alt="School Logo" className="school-logo" />
    </div>
  );
};
