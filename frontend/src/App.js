import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import {
  getAllCalendars,
  getInitialInfo,
} from "./store/actions/calendarActions";
import MainPage from "./components/MainPage";
import { Modal } from "./components/Modal";

// Do not change, this is for deploying on github pages
const repoHomePath = "/software-engineering-1-project";

const AppComponent = ({ getAll, getInitial, modal }) => {
  const { isOpen, modalType } = modal;
  useEffect(() => {
    getAll();
    getInitial();
  }, [getAll, getInitial]);

  return (
    <>
      {isOpen && <Modal type={modalType} />}
      <Routes>
        <Route exact path={repoHomePath} element={<MainPage />} />
      </Routes>
    </>
  );
};

const stateToProps = (state) => ({
  modal: state.modal,
});

const dispatchToProps = (dispatch) => ({
  getAll: () => dispatch(getAllCalendars()),
  getInitial: () => dispatch(getInitialInfo()),
});

export default connect(stateToProps, dispatchToProps)(AppComponent);
