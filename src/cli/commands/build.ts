import program from "commander";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { printResults } from "../printResults";
import { createConfigs } from "./config";

function build(dir: string) {
  const config = createConfigs(dir);

  if (program.analyze) {
    config[0].plugins.push(new BundleAnalyzerPlugin());
    config[0].profile = true;
  }

  const compiler = webpack(config);
  // @ts-ignore - The typings are not updated yet
  compiler.run(printResults);
}

program.command("build <dir>").action(build);
