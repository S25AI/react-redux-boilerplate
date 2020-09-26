import React from "react";
import { Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { history } from "../core/history";
import routes from "../routes";

function RootContainer() {
  return <Router history={history}>{renderRoutes(routes)}</Router>;
}

export { RootContainer };
