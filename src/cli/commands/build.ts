import program from "commander";
import webpack from "webpack";
import { printResults } from "../printResults";
import { createConfigs } from "./config";

function build(dir: string) {
  const config = createConfigs(dir);
  const compiler = webpack(config);

  // @ts-ignore - The typings are not updated yet
  compiler.run(printResults);
}

program.command("build <dir>").action(build);
