// Credit https://github.com/machadop1407/React-Modal-Tutorial

import React from "react";
import { AddEventModal } from "./AddEventModal";
import { AddNotificationModal } from "./AddNotificationModal";
import { CreateCalendarModal } from "./CreateCalendarModal";
import { EditEventModal } from "./EditEventModal";
import "./index.css";

export const Modal = ({ type }) => {
  let modalInner = <></>;

  if (type === "create") modalInner = <CreateCalendarModal />;
  if (type === "addevent") modalInner = <AddEventModal />;
  if (type === "addnotif") modalInner = <AddNotificationModal />;
  if (type === "editevent") modalInner = <EditEventModal />;

  return <div className="modalBackground">{modalInner}</div>;
};
