import * as webpack from "webpack";
import { manifest } from "./manifest"
import { cssExtractPlugin } from "./css-extract"

export default [
  manifest, 
  cssExtractPlugin
];
