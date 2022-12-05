import {
  CLOSE_MODAL,
  CREATE_CALENDAR_FAIL,
  OPEN_ADD_EVENT_MODAL,
  OPEN_ADD_NOTIF_MODAL,
  OPEN_CREATE_MODAL,
  OPEN_EDIT_CALENDAR_MODAL,
  OPEN_EDIT_EVENT_MODAL,
} from "../actions/actionTypes";

const initState = {
  modalType: "",
  isOpen: false,
  modalData: false,
};

export const modalReducer = (state = initState, action) => {
  switch (action.type) {
    case CREATE_CALENDAR_FAIL:
      return state;
    case OPEN_CREATE_MODAL:
    case OPEN_ADD_EVENT_MODAL:
    case OPEN_ADD_NOTIF_MODAL:
    case OPEN_EDIT_EVENT_MODAL:
    case OPEN_EDIT_CALENDAR_MODAL:
      return {
        ...state,
        ...action.payload,
        isOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalType: "",
        modalData: false,
        isOpen: action.payload,
      };
    default:
      return state;
  }
};
