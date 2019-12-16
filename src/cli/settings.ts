export interface Settings {
  output: Folders;
  wrappers: Wrappers;
  serverSideRendering: boolean;
}

export interface Wrappers {
  helmet: boolean;
  redux: boolean;
}

export interface Folders {
  client: string;
  server: string;
}