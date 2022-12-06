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
  const [currentPage, setCurrentPage] = useState([]);
  const [pageIndex, setCurrentPageIndex] = useState(0);

  useEffect(() => {
    if (events.length > 2) setShouldPaginate(true);
    else {
      setShouldPaginate(false);
    }
  }, [events]);

  useEffect(() => {
    if (shouldPaginate) {
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

  return (
    <div className={`calendar-item ${isToday ? "today" : ""}`}>
      <div className="calendar-item-number" onDoubleClick={itemOnDblClick}>
        {number}
      </div>
      <div
        className="calendar-item-events-container"
        onDoubleClick={itemOnDblClick}
      >
        {/* KLUDGE: I can promise you this shouldn't have to be a thing */}
        {shouldPaginate
          ? currentPage.map((e) => (
              <CalendarEvent event={e} key={`event-${e.name}-${e.calendar}`} />
            ))
          : events.map((e) => (
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
