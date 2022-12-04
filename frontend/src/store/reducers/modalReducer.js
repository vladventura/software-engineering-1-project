import {
  CLOSE_MODAL,
  CREATE_CALENDAR_FAIL,
  OPEN_ADD_EVENT_MODAL,
  OPEN_CREATE_MODAL,
} from "../actions/actionTypes";

const initState = {
  modalType: "",
  isOpen: false,
};

export const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_CALENDAR_FAIL:
      console.log("WOW");
      return state;
    case OPEN_CREATE_MODAL:
    case OPEN_ADD_EVENT_MODAL:
      return {
        ...state,
        modalType: action.payload,
        isOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalType: "",
        isOpen: action.payload,
      };
    default:
      return state;
  }
};
