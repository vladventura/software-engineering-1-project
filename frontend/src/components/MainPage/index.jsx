import personalCalendar from "../../mocks/calendar";
import { CalendarItem } from "../CalendarItem";

const MainPage = () => {
  return (
    <div className="main-page container">
      <CalendarItem number={22} events={[]} isToday={true}/>
    </div>
  );
};

export default MainPage;
