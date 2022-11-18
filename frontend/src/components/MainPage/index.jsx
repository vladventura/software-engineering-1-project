import { useState } from "react";
import { CalendarDisplay } from "../CalendarDisplay";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import "./index.css";

const MainPage = () => {
  const [viewC, toggleViewC] = useState(true);
  const toggleCalendar = (name) => {
    toggleViewC(!viewC);
  };

  return (
    <div className="main-page-container">
      <div className="header-section">
        <Header />
      </div>
      <div className="body-section-sidebar">
        <Sidebar toggleViewCalendar={toggleCalendar} viewCalendar={viewC} />
      </div>
      <div className="body-section-calendar">
        <CalendarDisplay viewCal={viewC} />
      </div>
    </div>
  );
};

export default MainPage;
