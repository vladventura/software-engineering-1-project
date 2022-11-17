import personalCalendar, { singleDay } from "../../mocks/calendar";
import { CalendarDisplay } from "../CalendarDisplay";
import { CalendarItem } from "../CalendarItem";
import { Header } from "../Header";
import "./index.css";

const MainPage = () => {
  return (
    <div className="main-page-container">
      <div className="header-section">
        <Header />
      </div>
      <div className="body-section">
        <div className="body-section-sidebar"></div>
        <div className="body-section-calendar">
          <CalendarDisplay />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
