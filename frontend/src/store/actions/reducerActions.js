import personalCalendar from "../../mocks/calendar";
import {
  GET_ALL_CALENDARS,
  GET_INITIAL_INFO,
  TOGGLE_CALENDAR,
} from "./actionTypes";

export const getAllCalendars = () => {
  return (dispatch, getState) => {
    // return axios....
    const fakePromise = (response) => {
      dispatch({
        type: GET_ALL_CALENDARS,
        payload: [personalCalendar],
      });
    };
    return new Promise(fakePromise);
  };
};

export const toggleCalendar = (calendarName) => {
  return (dispatch, getState) => {
    return new Promise(() =>
      dispatch({
        type: TOGGLE_CALENDAR,
        payload: calendarName,
      })
    );
  };
};

export const getInitialInfo = () => {
  return (dispatch, getState) => {
    const selectedDate = new Date();
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedYear = selectedDate.getFullYear();
    const selectedDay = selectedDate.getDate();
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    return new Promise(() =>
      dispatch({
        type: GET_INITIAL_INFO,
        payload: {
          selectedDate,
          selectedMonth,
          selectedYear,
          daysInMonth,
          selectedDay,
        },
      })
    );
  };
};
