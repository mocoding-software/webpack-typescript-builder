import program from "commander"
import webpack from "webpack";
import { createConfigs } from "./config";

function build(dir: string) {
    const config = createConfigs(dir);

    let compiler = webpack(config);
    //new webpack.ProgressPlugin().apply(compiler);
    compiler.run((err, stats: any) => {
        console.log(stats.stats[0].compilation);
        // console.log(stats.stats[1].compilation);
    });
}

program.command("build <dir>").action(build)
