import personalCalendar from "../../mocks/calendar";
import { GET_ALL, TOGGLE_CALENDAR } from "../actions/actionTypes";

const visibility = {};

visibility[personalCalendar.name] = personalCalendar.visible;

const initState = {
  message: "",
  body: {},
  loaded: false,
  calendars: [personalCalendar],
  visibility,
};

export const mainReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        loaded: action.payload.loaded,
        message: action.payload.message,
        body: action.payload.body,
      };
    case TOGGLE_CALENDAR:
      return {
        ...state,
        calendars: state.calendars.filter(),
      };

    default:
      return state;
  }
};
