import program from "commander"
import webpack from "webpack";
import { createConfig } from "./config";

function build(dir: string) {
    const config = createConfig(dir);

    let compiler = webpack(config);
    new webpack.ProgressPlugin().apply(compiler);
    compiler.run((err, stats) => {
        console.log(err);
    });
}

program.command("build <dir>").action(build)
