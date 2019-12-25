export interface RenderFuncProps {
  requestUrl: string;
  assets: string[];
  inlineScripts?: InlineScript[];
}

export interface InlineScript {
  position: "top" | "bottom";
  script: string;
}

export type RenderFunc = (
  callback: RenderCallback,
  props: RenderFuncProps,
) => void;

export type RenderCallback = (error: any, result?: RenderResult) => void;

export interface RenderHtmlResult {
  html: string;
}
export interface RedirectResult {
  redirectUrl: string;
}

export declare type RenderResult = RenderHtmlResult | RedirectResult;
