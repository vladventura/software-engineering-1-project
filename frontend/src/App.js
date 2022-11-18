import { connect } from "react-redux";
import { getAll } from "./store/actions/reducerActions";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import MainPage from "./components/MainPage";
import { useEffect } from "react";

const repoHomePath = "/software-engineering-1-project";

const AppComponent = (props) => {
  useEffect(() => {
    props.getAll();
  }, []);

  return (
    <Routes>
      <Route exact path={repoHomePath} element={<MainPage />} />
    </Routes>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAll: () => dispatch(getAll()),
  };
};

export default connect(null, mapDispatchToProps)(AppComponent);
