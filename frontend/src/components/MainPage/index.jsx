import personalCalendar, { singleDay } from "../../mocks/calendar";
import { CalendarItem } from "../CalendarItem";

const MainPage = () => {
  return (
    <div className="main-page container">
      <CalendarItem number={singleDay.number} events={singleDay.events} isToday={true}/>
    </div>
  );
};

export default MainPage;
