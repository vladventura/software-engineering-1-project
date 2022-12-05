import {
  CLOSE_MODAL,
  OPEN_ADD_EVENT_MODAL,
  OPEN_ADD_NOTIF_MODAL,
  OPEN_CREATE_MODAL,
  OPEN_EDIT_CALENDAR_MODAL,
  OPEN_EDIT_EVENT_MODAL,
} from "./actionTypes";

export const openCreateModal = (modalData = false) => {
  return (dispatch, getState) => {
    const { modal } = getState();
    if (!modal.isOpen)
      return new Promise(() =>
        dispatch({
          type: OPEN_CREATE_MODAL,
          payload: { modalType: "create", modalData },
        })
      );
  };
};

export const openEditCalendarModal = (modalData = false) => {
  return (dispatch, getState) => {
    const { modal } = getState();
    if (!modal.isOpen)
      return new Promise(() =>
        dispatch({
          type: OPEN_EDIT_CALENDAR_MODAL,
          payload: { modalType: "editcal", modalData },
        })
      );
  };
};

export const openAddEventModal = (modalData = false) => {
  return (dispatch, getState) => {
    const { modal } = getState();

    if (!modal.isOpen)
      return new Promise(() =>
        dispatch({
          type: OPEN_ADD_EVENT_MODAL,
          payload: { modalType: "addevent", modalData },
        })
      );
  };
};

export const openEditEventModal = (modalData) => {
  return (dispatch, getState) => {
    const { modal } = getState();

    if (!modal.isOpen && modalData)
      return new Promise(() =>
        dispatch({
          type: OPEN_EDIT_EVENT_MODAL,
          payload: { modalType: "editevent", modalData },
        })
      );
  };
};

export const openAddNotifModal = (modalData = false) => {
  return (dispatch, getState) => {
    const { modal } = getState();
    if (!modal.isOpen)
      return new Promise(() =>
        dispatch({
          type: OPEN_ADD_NOTIF_MODAL,
          payload: { modalType: "addnotif", modalData },
        })
      );
  };
};

export const closeModal = () => {
  return (dispatch, getState) => {
    return new Promise(() =>
      dispatch({
        type: CLOSE_MODAL,
        payload: false,
      })
    );
  };
};
