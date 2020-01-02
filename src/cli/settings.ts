export interface Settings {
  outputClientPath: string;
  outputServerPath: string;
  flavor: "basic" | "router-redux" | "router-redux-async";
  ssrModule: string;
}
