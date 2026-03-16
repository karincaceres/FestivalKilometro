import React from "react";
import { createRoot } from "react-dom/client";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";

const hist = createBrowserHistory();

createRoot(document.getElementById("root")).render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </Router>
);
