import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Switch, Route, Router } from "react-router-dom";
import Routes from "../src/routes/routes";
import store from "./state/store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import history from "./state/history";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import GA from "utils/GoogleAnalytics";
require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Switch>
            {GA.init() && <GA.RouteTracker />}
            <Route path="/" component={Routes} />
          </Switch>
        </App>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
