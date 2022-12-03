import "./index.css";
import { CalendarDisplay } from "../CalendarDisplay";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { connect } from "react-redux";

const MainPage = ({ modal }) => {
  console.log(modal);
  return (
    <div className="main-page-container">
      <div className="header-section">
        <Header />
      </div>
      <div className="body-section-sidebar">
        <Sidebar />
      </div>
      <div className="body-section-calendar">
        <CalendarDisplay />
      </div>
    </div>
  );
};

const stateToProps = (state) => ({
  modal: state.modal,
});

export default connect(stateToProps)(MainPage);
