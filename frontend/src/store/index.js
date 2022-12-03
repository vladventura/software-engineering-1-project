import { combineReducers } from "redux";
import { calendarsReducer } from "./reducers/calendarsReducer";
import { modalReducer } from "./reducers/modalReducer";

export const rootReducer = combineReducers({
  calendars: calendarsReducer,
  modal: modalReducer,
});
