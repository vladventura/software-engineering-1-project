import {
  CREATE_CALENDAR,
  CREATE_EVENT,
  CREATE_NOTIF,
  DELETE_EVENT,
  EDIT_CALENDAR,
  EDIT_EVENT,
  GET_ALL_CALENDARS,
  GET_INITIAL_INFO,
  GO_BACK_MONTHLY,
  GO_FORWARD_MONTHLY,
  TOGGLE_CALENDAR,
} from "../actions/actionTypes";

const initState = {
  allCalendars: [],
  selectedDate: 0,
  selectedMonth: 0,
  selectedYear: 0,
  selectedDay: 0,
  daysInMonth: 0,
  monthName: "",
};

export const calendarsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL_CALENDARS:
      return {
        ...state,
        allCalendars: action.payload,
      };
    case TOGGLE_CALENDAR:
      // Not too good
      let changedVis = [...state.allCalendars];
      changedVis.forEach((c) => {
        if (c.name === action.payload) c.visible = !c.visible;
      });
      return {
        ...state,
        allCalendars: changedVis,
      };
    case CREATE_CALENDAR:
      return {
        ...state,
        allCalendars: [...state.allCalendars, action.payload],
      };
    case CREATE_EVENT:
    case CREATE_NOTIF:
    case EDIT_EVENT:
    case EDIT_CALENDAR:
    case DELETE_EVENT:
      return {
        ...state,
        allCalendars: [...action.payload],
      };
    case GET_INITIAL_INFO:
      return {
        ...state,
        ...action.payload,
      };
    case GO_BACK_MONTHLY:
    case GO_FORWARD_MONTHLY:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
