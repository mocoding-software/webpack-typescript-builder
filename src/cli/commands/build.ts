import program from "commander";
import webpack from "webpack";
import { createConfigs } from "./config";

function build(dir: string) {
  const config = createConfigs(dir);

  const compiler = webpack(config);
  compiler.run((err, stats: any) => {
    // some
  });
}

program.command("build <dir>").action(build);
