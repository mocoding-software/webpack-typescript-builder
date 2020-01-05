// @ts-nocheck

import { connectRouter } from "connected-react-router";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import * as Redux from "redux";
import { Context } from "../../common";

// @ts-ignore
import devMiddlewares from "injected-default-middlewares";
import { middlewares, reducers } from "injected-app-module/store";

export function createContext(abstractHistory?: History): Context {
  const initialState =
    typeof window === "undefined" ||
    typeof (window as any).__PRELOADED_STATE__ === "undefined"
      ? undefined
      : JSON.parse((window as any)?.__PRELOADED_STATE__);
  const history = abstractHistory ?? createBrowserHistory();
  return {
    history,
    store: configureStore(history, initialState),
  };
}

function createRootReducer(history: History, appReducers: any) {
  return Redux.combineReducers({
    ...appReducers,
    router: connectRouter(history),
  });
}

function configureStore(history: History, initialState?: any): any {
  // Create reducers from root
  const rootReducers = createRootReducer(history, reducers);

  // Adding logger and router to middlewares
  const isSsr = typeof window === "undefined";
  const defaultMiddlewares: Redux.Middleware = !isSsr ? devMiddlewares : [];
  defaultMiddlewares.push(routerMiddleware(history));

  const pipeline = Redux.applyMiddleware(...defaultMiddlewares, ...middlewares);

  // create store
  const store = Redux.createStore(
    rootReducers,
    initialState,
    Redux.compose(pipeline),
  );

  if (module.hot) {
    module.hot.accept(["injected-app-module/store"], () => {
      const newStore = require("injected-app-module/store");
      const nextReducer = createRootReducer(history, newStore.reducers);

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
