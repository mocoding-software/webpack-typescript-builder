export type RenderFunc = (
  callback: RenderCallback,
  requestUrl: string,
  assets: string[],
  settings?: any,
) => void;

export type RenderCallback = (error: any, result?: RenderResult) => void;

export interface RenderHtmlResult {
  html: string;
}
export interface RedirectResult {
  redirectUrl: string;
}

export declare type RenderResult = RenderHtmlResult | RedirectResult;
