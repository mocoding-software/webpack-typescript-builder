import { connectRouter } from "connected-react-router";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory, History } from "history";
import * as Redux from "redux";
import { logger } from "redux-logger";
import { Context } from "../../common";

// @ts-ignore
import { middlewares, reducers } from "injected-app-module/store";

export function createContext(abstractHistory?: History): Context {
  const isSsr = typeof window === "undefined";
  const initialState =
    typeof isSsr || typeof (window as any).__PRELOADED_STATE__ === "undefined"
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
  const pipeline = Redux.applyMiddleware(
    logger,
    routerMiddleware(history),
    ...middlewares,
  );

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
