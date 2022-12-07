import axios from "axios";
import personalCalendar, { guiCalendar } from "../../mocks/calendar";
import {
  CREATE_CALENDAR,
  CREATE_EVENT,
  CREATE_NOTIF,
  DELETE_CALENDAR,
  DELETE_EVENT,
  EDIT_CALENDAR,
  EDIT_EVENT,
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
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    )
      return axios("http://localhost:8000/api/calendar/all", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        const allIncomingCalendars = Object.keys(response.data)
          .map((calObj) => response.data[calObj])
          .map((cal) => ({
            name: cal.title,
            events: Object.keys(cal.events).map((evObj) => {
              const current = cal["events"][evObj];
              const name = current.title;
              const description = current.description;
              const duration = new Date(current.duration);
              const dueTime = `${duration.getHours()}:${duration.getMinutes()}`;
              const incDate = new Date(current.date);
              const date = incDate.toLocaleDateString();
              const number = incDate.getDate();
              const month = incDate.getMonth() + 1;
              const official = cal["is_official"];
              const color = cal.color;
              const calendar = cal.title;
              return {
                date,
                number,
                month,
                dueTime,
                description,
                official,
                submitted: false,
                calendar,
                name,
                color,
              };
            }),
            course: cal["is_official"],
            color: cal.color,
            visible: true,
          }));
        dispatch({
          type: GET_ALL_CALENDARS,
          payload: allIncomingCalendars,
        });
      });
    else
      return new Promise(() =>
        dispatch({
          type: GET_ALL_CALENDARS,
          payload: [personalCalendar, guiCalendar],
        })
      );
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
    const localLanguage = {
      name: name,
      color: color,
      events: [],
      visible: true,
      course: false,
    };

    const model = {
      color,
      title: localLanguage.name,
      events: {},
      is_official: localLanguage.course,
    };

    const body = {
      model,
      calendar: name,
    };

    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    )
      return axios("http://localhost:8000/api/calendar", {
        method: "post",
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        dispatch({
          type: CREATE_CALENDAR,
          payload: localLanguage,
        });
      });
    return new Promise(() =>
      // Might need to dispatch two actions here
      dispatch({
        type: CREATE_CALENDAR,
        payload: localLanguage,
      })
    );
  };
};

export const createEvent = (event) => {
  return (dispatch, getState) => {
    // Server must return if valid operation or not
    const { calendars } = getState();
    const localLanguage = { ...event, official: false };

    const model = {
      title: localLanguage.name,
      description: localLanguage.description,
      date: new Date(localLanguage.date),
      duration: "2022-12-06T11:59:59",
      repeats: false,
      frequency: 0,
    };

    const body = {
      model,
      calendar: localLanguage.calendar,
    };

    const newAllCals = [...calendars.allCalendars];
    newAllCals.forEach((c) => {
      if (c.name === localLanguage.calendar) {
        c.events.push(localLanguage);
      }
    });

    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    )
      return axios("http://localhost:8000/api/calendar/event", {
        method: "post",
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        dispatch({
          type: CREATE_EVENT,
          payload: newAllCals,
        });
      });

    return new Promise(() =>
      // Might need to dispatch two actions here
      dispatch({
        type: CREATE_EVENT,
        payload: newAllCals,
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

    const model = {
      title: event.name,
      description: event.description,
      date: new Date(event.date),
      duration: "2022-12-06T11:59:59",
      repeats: false,
      frequency: 0,
    };

    const body = {
      model,
      calendar: event.calendar,
    };

    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    )
      return axios("http://localhost:8000/api/calendar/event", {
        method: "put",
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        dispatch({
          type: EDIT_EVENT,
          payload: newAllCals,
        });
      });

    return new Promise(() =>
      // Might need to dispatch two actions here
      dispatch({
        type: EDIT_EVENT,
        payload: newAllCals,
      })
    );
  };
};

// Ideally backend dictates if name exists
export const editCalendar = (newName, newColor, oldName) => {
  return (dispatch, getState) => {
    // Server must return if valid operation or not
    const { calendars } = getState();

    const model = {
      title: newName,
      events: {},
      is_official: false,
      color: newColor,
    };

    const body = {
      model,
      calendar: oldName,
    };

    const previousCalendar = calendars.allCalendars.filter(
      (c) => c.name === oldName
    )[0];

    const newCalendarToSave = {
      ...previousCalendar,
      name: newName,
      color: newColor,
    };

    const newAllCals = [...calendars.allCalendars].filter(
      (c) => c.name !== oldName
    );

    newCalendarToSave.events = [
      ...newCalendarToSave.events.map((e) => ({
        ...e,
        color: newColor,
        calendar: newName,
      })),
    ];

    newAllCals.push(newCalendarToSave);

    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    )
      return axios("http://localhost:8000/api/calendar", {
        method: "put",
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        dispatch({
          type: EDIT_CALENDAR,
          payload: newAllCals,
        });
      });

    return new Promise(() =>
      dispatch({
        type: EDIT_CALENDAR,
        payload: newAllCals,
      })
    );
  };
};

export const deleteCalendar = (name) => {
  return (dispatch, getState) => {
    // Server must return if valid operation or not
    const { calendars } = getState();

    const newAllCals = [
      ...calendars.allCalendars.filter((x) => x.name !== name),
    ];

    const model = {
      color: "#ffffff",
      title: name,
      events: {},
      is_official: false,
    };

    const body = {
      model,
      calendar: name,
    };

    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    )
      return axios("http://localhost:8000/api/calendar", {
        method: "delete",
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((_) =>
        dispatch({
          type: DELETE_CALENDAR,
          payload: newAllCals,
        })
      );
    return new Promise(() =>
      dispatch({
        type: DELETE_CALENDAR,
        payload: newAllCals,
      })
    );
  };
};

export const deleteEvent = (event) => {
  return (dispatch, getState) => {
    // Server must return if valid operation or not
    const { calendars } = getState();

    const newAllCals = [...calendars.allCalendars];
    let cI = 0;
    let eI = 0;
    newAllCals.every((c, i) => {
      if (c.name === event.calendar) {
        c.events.every((e, ei) => {
          if (
            e.name === event.name &&
            e.description === event.description &&
            e.date === event.date &&
            e.calendar === event.calendar
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
    const model = {
      title: event.name,
      description: event.description,
      date: new Date(event.date),
      duration: "2022-12-06T11:59:59",
      repeats: 1,
      frequency: 0,
    };

    const body = {
      model,
      calendar: event.calendar,
    };

    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    )
      return axios("http://localhost:8000/api/calendar/event", {
        method: "delete",
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((_) =>
        dispatch({
          type: DELETE_EVENT,
          payload: newAllCals,
        })
      );
    return new Promise(() =>
      // Might need to dispatch two actions here
      dispatch({
        type: DELETE_EVENT,
        payload: newAllCals,
      })
    );
  };
};

export const createNotification = (notif) => {
  return (dispatch, getState) => {
    // Server must return if valid operation or not
    const { calendars } = getState();

    let newAllCals = [...calendars.allCalendars];
    const parentCalendar = newAllCals[notif.calendarIndex];
    const parentEvent = parentCalendar.events[notif.eventIndex];

    newAllCals[notif.calendarIndex].events[notif.eventIndex].notification =
      notif;

    const body = {
      calendar: parentCalendar.name,
      event: notif.eventName,
      date: new Date(parentEvent.date),
      triggerWindow: new Date(parentEvent.date),
      repeats: false,
      frequency: 0,
      method: ["SMS", "Email", "Both"].indexOf(notif.method),
    };

    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    )
      return axios("http://localhost:8000/api/calendar/notification", {
        method: "post",
        data: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((_) =>
        dispatch({
          type: CREATE_NOTIF,
          payload: newAllCals,
        })
      );
    return new Promise(() =>
      // Might need to dispatch two actions here
      dispatch({
        type: CREATE_NOTIF,
        payload: newAllCals,
      })
    );
  };
};
