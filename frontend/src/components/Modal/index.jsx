// Credit https://github.com/machadop1407/React-Modal-Tutorial

import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../store/actions/modalActions";
import { CreateCalendarModal } from "./CreateCalendarModal";
import "./index.css";

const ModalComponent = ({ type, close }) => {
  let modalInner = <></>;

  if (type === "create") modalInner = <CreateCalendarModal />;

  return <div className="modalBackground">{modalInner}</div>;
};

const dispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
});

export const Modal = connect(null, dispatchToProps)(ModalComponent);
