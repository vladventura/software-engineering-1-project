import { combineReducers } from "redux";
import { calendarsReducer } from "./reducers/calendarsReducer";

export const rootReducer = combineReducers({
  calendars: calendarsReducer,
});
