import * as webpack from "webpack";
import { css, noCss } from "./css";
import { fonts, noFonts } from "./fonts";
import { images, noImages } from "./images";
import { noSass, sass, sassGlob } from "./sass";
import { tslint } from "./tslint";
import { typescript } from "./typescript";

export const clientRules: (
  isProduction: boolean,
) => webpack.RuleSetRule[] = isProduction => [
  typescript,
  tslint,
  css(isProduction),
  sass(isProduction),
  sassGlob,
  fonts,
  images,
];
export const serverRules = [
  typescript,
  tslint,
  noCss,
  noSass,
  noFonts,
  noImages,
];
