import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppContainer } from "react-hot-loader";
import { ConnectedRouter } from "connected-react-router";

import { RootContainer } from "./components/RootContainer";
import { init } from "./core/init";
import { history } from "./core/history";
import configureStore from "./store";
import "./style.css";

const render = (Component, data) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={configureStore()}>
        <ConnectedRouter history={history}>
          <Component data={data} />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById("root")
  );
};

init()
  .then((data) => {
    render(RootContainer, data);

    if (module.hot) {
      module.hot.accept("./components/RootContainer", () => {
        render(RootContainer, data);
      });
    }
  })
  .catch(console.error);
