import {
  CLOSE_MODAL,
  OPEN_ADD_EVENT_MODAL,
  OPEN_CREATE_MODAL,
} from "./actionTypes";

export const openCreateModal = () => {
  return (dispatch, getState) => {
    const { modal } = getState();
    if (!modal.isOpen)
      return new Promise(() =>
        dispatch({
          type: OPEN_CREATE_MODAL,
          payload: "create",
        })
      );
  };
};

export const openAddEventModal = () => {
  return (dispatch, getState) => {
    const { modal } = getState();
    if (!modal.isOpen)
      return new Promise(() =>
        dispatch({
          type: OPEN_ADD_EVENT_MODAL,
          payload: "addevent",
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
