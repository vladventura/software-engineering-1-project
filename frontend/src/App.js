import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import {
  getAllCalendars,
  getInitialInfo,
} from "./store/actions/reducerActions";
import MainPage from "./components/MainPage";

// Do not change, this is for deploying on github pages
const repoHomePath = "/software-engineering-1-project";

const AppComponent = ({ getAll, getInitial }) => {
  useEffect(() => {
    getAll();
    getInitial();
  }, [getAll, getInitial]);

  return (
    <Routes>
      <Route exact path={repoHomePath} element={<MainPage />} />
    </Routes>
  );
};

const dispatchToProps = (dispatch) => ({
  getAll: () => dispatch(getAllCalendars()),
  getInitial: () => dispatch(getInitialInfo()),
});

export default connect(null, dispatchToProps)(AppComponent);
