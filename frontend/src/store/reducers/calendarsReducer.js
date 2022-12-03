import {
  CREATE_CALENDAR,
  GET_ALL_CALENDARS,
  GET_INITIAL_INFO,
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
    case GET_INITIAL_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
