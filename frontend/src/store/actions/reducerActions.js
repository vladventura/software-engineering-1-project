import personalCalendar from "../../mocks/calendar";
import {
  GET_ALL_CALENDARS,
  GET_INITIAL_INFO,
  TOGGLE_CALENDAR,
} from "./actionTypes";

const monthNames = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

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
          monthName: monthNames[selectedMonth],
        },
      })
    );
  };
};
