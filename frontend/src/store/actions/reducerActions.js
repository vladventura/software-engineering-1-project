import axios from "axios";
import { GET_ALL, TOGGLE_CALENDAR } from "./actionTypes";

const bodyData = {
  code: "Talker",
  dot: "Polka",
  gear: "Guilty",
};
const messageData = "Hello World";

export const getAll = () => {
  return (dispatch, getState) => {
    const url = "" + "";
    // return axios....
    const fakePromise = (response) => {
      dispatch({
        type: GET_ALL,
        payload: {
          body: bodyData,
          message: messageData,
          loaded: true,
        },
      });
    };
    return new Promise(fakePromise);
  };
};

export const toggleCalendar = (calendarName) => {
  return (dispatch, getState) => {
    dispatch({
      type: TOGGLE_CALENDAR,
      payload: calendarName,
    });
  };
};
