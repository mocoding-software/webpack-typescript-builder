export interface Settings {
  outputClientPath: string;
  outputServerPath: string;
  flavor: "basic" | "router-redux" | "router-redux-async";
  ssrModule?: string;
  extend?: ExtendConfigSettings;
}

export interface ExtendConfigSettings {
  serverConfig?: string;
  clientConfig?: string;
}
