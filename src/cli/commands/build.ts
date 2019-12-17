import program from "commander"
import webpack from "webpack";
import { createConfigs } from "./config";

function build(dir: string) {
    const config = createConfigs(dir);

    let compiler = webpack(config);    
    compiler.run((err, stats: any) => {
        //console.log(stats.stats[0].compilation);        
    });
}

program.command("build <dir>").action(build)
