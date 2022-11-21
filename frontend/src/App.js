import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";

// Do not change, this is for deploying on github pages
const repoHomePath = "/software-engineering-1-project";

const AppComponent = () => {
  return (
    <Routes>
      <Route exact path={repoHomePath} element={<MainPage />} />
    </Routes>
  );
};

export default AppComponent;
