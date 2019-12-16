import * as Redux from "redux";
import { logger } from "redux-logger";
//import { ReduxWrapper } from "./redux-wrapper";

// @ts-ignore
import { reducers, middlewares } from "injected-app-module/store";

// Adding logger to middlewares
const pipeline = Redux.applyMiddleware(...middlewares.concat(logger));

// Create reducers from root
const rootReducers = Redux.combineReducers(reducers);

const initialState =
  typeof window === "undefined" ||
  typeof (window as any).__PRELOADED_STATE__ === "undefined"
    ? undefined
    : JSON.parse((window as any)?.__PRELOADED_STATE__);

export const store = Redux.createStore(
  rootReducers,
  initialState,
  Redux.compose(pipeline)
);

if (module.hot) {
  module.hot.accept(["injected-app-module/store"], () => {    
    const { reducers } = require("injected-app-module/store");
    const nextReducer = Redux.combineReducers(reducers);

    store.replaceReducer(nextReducer as any);
  });
}
