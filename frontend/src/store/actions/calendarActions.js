import personalCalendar, { guiCalendar } from "../../mocks/calendar";
import {
  CREATE_CALENDAR,
  CREATE_CALENDAR_FAIL,
  CREATE_EVENT,
  CREATE_EVENT_FAIL,
  CREATE_NOTIF,
  CREATE_NOTIF_FAIL,
  DELETE_CALENDAR,
  DELETE_CALENDAR_FAIL,
  DELETE_EVENT,
  DELETE_EVENT_FAIL,
  EDIT_CALENDAR,
  EDIT_CALENDAR_FAIL,
  EDIT_EVENT,
  EDIT_EVENT_FAIL,
  GET_ALL_CALENDARS,
  GET_INITIAL_INFO,
  GO_BACK_MONTHLY,
  GO_FORWARD_MONTHLY,
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
        payload: [personalCalendar, guiCalendar],
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

export const goBackMonthly = () => {
  return (dispatch, getState) => {
    const { calendars } = getState();
    const newSelectedDate = new Date(calendars.selectedDate.getTime());
    newSelectedDate.setMonth(newSelectedDate.getMonth() - 1);
    const selectedMonth = newSelectedDate.getMonth() + 1;
    const monthName = monthNames[selectedMonth];
    const selectedYear = newSelectedDate.getFullYear();
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const payload = {
      selectedYear,
      selectedMonth,
      monthName,
      daysInMonth,
      selectedDate: newSelectedDate,
    };
    return new Promise(() =>
      dispatch({
        payload,
        type: GO_BACK_MONTHLY,
      })
    );
  };
};
export const goForwardMonthly = () => {
  return (dispatch, getState) => {
    const { calendars } = getState();
    const newSelectedDate = new Date(calendars.selectedDate.getTime());
    newSelectedDate.setMonth(newSelectedDate.getMonth() + 1);
    const selectedMonth = newSelectedDate.getMonth() + 1;
    const monthName = monthNames[selectedMonth];
    const selectedYear = newSelectedDate.getFullYear();
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const payload = {
      selectedYear,
      selectedMonth,
      monthName,
      daysInMonth,
      selectedDate: newSelectedDate,
    };
    return new Promise(() =>
      dispatch({
        payload,
        type: GO_FORWARD_MONTHLY,
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
        events: [],
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

export const editEvent = (event) => {
  return (dispatch, getState) => {
    // Server must return if valid operation or not
    const { calendars } = getState();
    const { oldVersion } = event;
    delete event["oldVersion"];
    const moveRequested = oldVersion.calendar !== event.calendar;

    const response = {
      code: 200,
      body: {
        ...event,
        moveRequested,
        official: false,
      },
      error: "Name in use",
    };
    const { code } = response;

    const newAllCals = [...calendars.allCalendars];
    let cI = 0;
    let eI = 0;
    newAllCals.every((c, i) => {
      if (c.name === oldVersion.calendar) {
        c.events.every((e, ei) => {
          if (
            e.name === oldVersion.name &&
            e.description === oldVersion.description &&
            e.date === oldVersion.date &&
            e.calendar === oldVersion.calendar
          ) {
            cI = i;
            eI = ei;
            return false;
          }
          return true;
        });
        return false;
      }
      return true;
    });
    if (moveRequested) {
      delete newAllCals[cI].events[eI];
      // Insert onto new
      newAllCals.forEach((c) => {
        if (c.name === event.calendar) {
          // Fixing the color
          event = { ...event, color: c.color };
          c.events.push(event);
        }
      });
    } else {
      newAllCals[cI].events[eI] = { ...event };
    }
    if (code === 200) {
      return new Promise(() =>
        // Might need to dispatch two actions here
        dispatch({
          type: EDIT_EVENT,
          payload: newAllCals,
        })
      );
    }
    return new Promise(() =>
      dispatch({
        type: EDIT_EVENT_FAIL,
        payload: response.error,
      })
    );
  };
};

// Ideally backend dictates if name exists
export const editCalendar = (newName, newColor, oldName) => {
  return (dispatch, getState) => {
    // Server must return if valid operation or not
    const { calendars } = getState();

    const request = {
      newName,
      newColor,
      oldName,
    };

    const response = {
      code: 200,
      body: {
        ...request,
        official: false,
      },
      error: "Name in use",
    };

    const { code, body } = response;

    const newAllCals = [...calendars.allCalendars];
    let cI = 0;
    newAllCals.every((c, i) => {
      if (c.name === body.oldName) {
        cI = i;
        return false;
      }
      return true;
    });

    newAllCals[cI].name = newName;
    newAllCals[cI].color = newColor;
    newAllCals[cI].events = [
      ...newAllCals[cI].events.map((e) => ({
        ...e,
        color: newColor,
        calendar: newName,
      })),
    ];
    if (code === 200) {
      return new Promise(() =>
        dispatch({
          type: EDIT_CALENDAR,
          payload: newAllCals,
        })
      );
    }
    return new Promise(() =>
      dispatch({
        type: EDIT_CALENDAR_FAIL,
        payload: response.error,
      })
    );
  };
};

export const deleteCalendar = (name) => {
  return (dispatch, getState) => {
    // Server must return if valid operation or not
    const { calendars } = getState();

    const response = {
      code: 200,
      body: {
        name,
      },
      error: "Name in use",
    };

    const { code, body } = response;

    const newAllCals = [
      ...calendars.allCalendars.filter((x) => x.name !== body.name),
    ];

    if (code === 200) {
      return new Promise(() =>
        dispatch({
          type: DELETE_CALENDAR,
          payload: newAllCals,
        })
      );
    }
    return new Promise(() =>
      dispatch({
        type: DELETE_CALENDAR_FAIL,
        payload: response.error,
      })
    );
  };
};

export const deleteEvent = (event) => {
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
    let cI = 0;
    let eI = 0;
    newAllCals.every((c, i) => {
      if (c.name === body.calendar) {
        c.events.every((e, ei) => {
          if (
            e.name === body.name &&
            e.description === body.description &&
            e.date === body.date &&
            e.calendar === body.calendar
          ) {
            cI = i;
            eI = ei;
            return false;
          }
          return true;
        });
        return false;
      }
      return true;
    });
    delete newAllCals[cI].events[eI];
    if (code === 200) {
      return new Promise(() =>
        // Might need to dispatch two actions here
        dispatch({
          type: DELETE_EVENT,
          payload: newAllCals,
        })
      );
    }
    return new Promise(() =>
      dispatch({
        type: DELETE_EVENT_FAIL,
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
