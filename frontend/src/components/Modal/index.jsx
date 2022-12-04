// Credit https://github.com/machadop1407/React-Modal-Tutorial

import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../store/actions/modalActions";
import { AddEventModal } from "./AddEventModal";
import { CreateCalendarModal } from "./CreateCalendarModal";
import "./index.css";

const ModalComponent = ({ type, close }) => {
  let modalInner = <></>;

  if (type === "create") modalInner = <CreateCalendarModal />;
  if (type === "addevent") modalInner = <AddEventModal />;

  return <div className="modalBackground">{modalInner}</div>;
};

const dispatchToProps = (dispatch) => ({
  close: () => dispatch(closeModal()),
});

export const Modal = connect(null, dispatchToProps)(ModalComponent);
