import { OPEN_CREATE_MODAL } from "./actionTypes";

export const openCreateModal = () => {
  return (dispatch, getState) => {
    const { modal } = getState();
    if (!modal.isOpen)
      return new Promise(() => {
        dispatch({
          type: OPEN_CREATE_MODAL,
          payload: "create",
        });
      });
  };
};
