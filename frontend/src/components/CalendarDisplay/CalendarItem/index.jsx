import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { openAddEventModal } from "../../../store/actions/modalActions";
import { CalendarEvent } from "./CalendarEvent";
import "./index.css";

const CalendarItemComponent = ({
  number,
  events = [],
  isToday = false,
  dateString,
  openAddEvent,
}) => {
  const itemOnDblClick = () => {
    openAddEvent(dateString);
  };

  const [shouldPaginate, setShouldPaginate] = useState(false);
  const [paginatedEvents, setPaginatedEvents] = useState([]);
  // If it works, it works
  const [currentPage, setCurrentPage] = useState(events);
  const [pageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    if (events.length > 2) setShouldPaginate(true);
  }, [events]);

  useEffect(() => {
    if (shouldPaginate) {
      console.log("Should Page");
      const paginated = events.reduce((acc, _, index, evs) => {
        if (index % 2 === 0) acc.push(evs.slice(index, index + 2));
        return acc;
      }, []);
      setPaginatedEvents(paginated);
      setCurrentPage(paginated[0]);
      return;
    }
  }, [shouldPaginate, events]);

  const shouldShowRightArrow = () => pageIndex < paginatedEvents.length - 1;
  const shouldShowLeftArrow = () => pageIndex > 0;

  const pageUp = () => {
    if (shouldShowRightArrow()) {
      setCurrentPage(paginatedEvents[pageIndex + 1]);

      setCurrentPageIndex(pageIndex + 1);
    }
  };

  const pageDown = () => {
    if (shouldShowLeftArrow()) {
      setCurrentPage(paginatedEvents[pageIndex - 1]);
      setCurrentPageIndex(pageIndex - 1);
    }
  };

  console.log(pageIndex, shouldShowLeftArrow());

  return (
    <div className={`calendar-item ${isToday ? "today" : ""}`}>
      <div className="calendar-item-number" onDoubleClick={itemOnDblClick}>
        {number}
      </div>
      <div
        className="calendar-item-events-container"
        onDoubleClick={itemOnDblClick}
      >
        {currentPage.map((e) => (
          <CalendarEvent event={e} key={`event-${e.name}-${e.calendar}`} />
        ))}
      </div>
      {shouldPaginate && (
        <div className="calendar-item-pagination-arrows">
          <div
            className="pagination-arrow"
            onClick={pageDown}
            style={{
              visibility: shouldShowLeftArrow() ? "visible" : "hidden",
            }}
          >
            {"<"}
          </div>
          <div
            className="pagination-arrow"
            onClick={pageUp}
            style={{
              visibility: shouldShowRightArrow() ? "visible" : "hidden",
            }}
          >
            {">"}
          </div>
        </div>
      )}
    </div>
  );
};

const dispatchToProps = (dispatch) => ({
  openAddEvent: (dateString) => dispatch(openAddEventModal(dateString)),
});

export const CalendarItem = connect(
  null,
  dispatchToProps
)(CalendarItemComponent);
