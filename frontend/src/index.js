import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// TODO: Migrate to Redux TK
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { rootReducer } from "./store";
import App from "./App";
import "./index.css";

const composed = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(rootReducer, composed);
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
