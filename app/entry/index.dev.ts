// @ts-ignore
import * as AppModule from "injected-app-module";
import { hot } from "react-hot-loader/root";
import { logger } from "redux-logger";

const App = hot(AppModule.App);
const devMiddlewares = [logger];

export { App, devMiddlewares };
