import { RouterState } from "connected-react-router";
import { addTask, fetch } from "domain-task";
import * as Redux from "redux";
import thunk from "redux-thunk";

interface ApplicationState {
  router?: RouterState;
  stars?: number;
}

interface StatsAction extends Redux.Action<string> {
  stats?: number;
}

const starsReducer = (
  state: number | null = null,
  action: StatsAction,
): any => {
  switch (action.type) {
    case "LOAD_STARS":
      return action.stats;
    default:
      return state;
  }
};

export function fetchStarsAction() {
  return (dispatch: Redux.Dispatch) => {
    const url =
      "https://api.github.com/repos/mocoding-software/webpack-typescript-builder";
    // Promise is added because there is a setTimeout
    const task = new Promise((resolve, reject) =>
      fetch(url)
        .then(response => response.json())
        .then(data =>
          setTimeout(() => {
            dispatch({
              stats: data.stargazers_count,
              type: "LOAD_STARS",
            });
            resolve();
          }, 2000),
        ),
    );
    addTask(task); // inform domain to wait until this is finished
  };
}

const middlewares: Redux.Middleware[] = [thunk];
const reducers: Redux.ReducersMapObject<ApplicationState> = {
  stars: starsReducer,
};

export { middlewares, reducers };
