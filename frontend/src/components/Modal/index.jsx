// Credit https://github.com/machadop1407/React-Modal-Tutorial

import React from "react";
import "./index.css";

export const Modal = ({ setOpenModal, title, body }) => {
  const closeModal = () => {
    setOpenModal?.(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="body">
          <p>{body}</p>
        </div>
        <div className="footer">
          <button onClick={closeModal} id="cancelBtn">
            Cancel
          </button>
          <button onClick={closeModal}>Continue</button>
        </div>
      </div>
    </div>
  );
};
