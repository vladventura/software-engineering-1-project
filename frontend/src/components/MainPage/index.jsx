import { CalendarDisplay } from "../CalendarDisplay";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import "./index.css";

const MainPage = () => {
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

export default MainPage;
