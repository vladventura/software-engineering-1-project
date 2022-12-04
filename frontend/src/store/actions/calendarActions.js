import personalCalendar from "../../mocks/calendar";
import {
  CREATE_CALENDAR,
  CREATE_CALENDAR_FAIL,
  CREATE_EVENT,
  CREATE_EVENT_FAIL,
  CREATE_NOTIF,
  CREATE_NOTIF_FAIL,
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

export const createCalendar = (name, color) => {
  return (dispatch, getState) => {
    // Server must return if valid operation or not
    const response = {
      code: 200,
      body: {
        name: name,
        color: color,
        events: [
          {
            date: `12/11/2022`,
            number: 11,
            month: 12,
            dueTime: "1:00pm",
            description: `An event ${11}`,
            official: 11 % 2 === 0,
            calendar: name,
            name: `Event11`,
            color: color,
          },
        ],
        visible: true,
        course: false,
      },
      error: "Name in use",
    };
    const { code } = response;
    if (code === 200) {
      return new Promise(() =>
        // Might need to dispatch two actions here
        dispatch({
          type: CREATE_CALENDAR,
          payload: response.body,
        })
      );
    }
    return new Promise(() =>
      dispatch({
        type: CREATE_CALENDAR_FAIL,
        payload: response.error,
      })
    );
  };
};
export const createEvent = (event) => {
  return (dispatch, getState) => {
    // Server must return if valid operation or not
    const { calendars } = getState();

    const response = {
      code: 200,
      body: {
        ...event,
        official: false,
      },
      error: "Name in use",
    };
    const { code, body } = response;

    const newAllCals = [...calendars.allCalendars];
    newAllCals.forEach((c) => {
      if (c.name === body.calendar) {
        c.events.push(body);
      }
    });
    if (code === 200) {
      return new Promise(() =>
        // Might need to dispatch two actions here
        dispatch({
          type: CREATE_EVENT,
          payload: newAllCals,
        })
      );
    }
    return new Promise(() =>
      dispatch({
        type: CREATE_EVENT_FAIL,
        payload: response.error,
      })
    );
  };
};

export const createNotification = (notif) => {
  return (dispatch, getState) => {
    // Server must return if valid operation or not
    const { calendars } = getState();

    const response = {
      code: 200,
      body: {
        ...notif,
      },
    };
    const { code } = response;

    let newAllCals = [...calendars.allCalendars];
    newAllCals[notif.calendarIndex].events[notif.eventIndex].notification =
      notif;

    if (code === 200) {
      return new Promise(() =>
        // Might need to dispatch two actions here
        dispatch({
          type: CREATE_NOTIF,
          payload: newAllCals,
        })
      );
    }
    return new Promise(() =>
      dispatch({
        type: CREATE_NOTIF_FAIL,
        payload: response.error,
      })
    );
  };
};
