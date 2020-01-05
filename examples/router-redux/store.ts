import { RouterState } from "connected-react-router";
import * as Redux from "redux";

interface ApplicationState {
  router?: RouterState;
  counter: number;
}

const counterReducer = (state = 1, action: Redux.Action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const middlewares: Redux.Middleware[] = [];
const reducers: Redux.ReducersMapObject<ApplicationState> = {
  counter: counterReducer,
};

export { middlewares, reducers };
