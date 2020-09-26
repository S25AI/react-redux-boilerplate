import React from "react";
import { renderRoutes } from "react-router-config";

export const Root = ({ route }) => <>{renderRoutes(route.routes)}</>;
