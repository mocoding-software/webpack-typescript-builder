import program from "commander"
import webpack from "webpack";
import { createUmdConfig } from "../../config-builder"
import * as path from "path";

export function build(dir: string) {
    const cwd = process.cwd();
    console.log(`Start building ${dir} in: ${cwd}`)

    // set default paths
    const outputPath = path.join(cwd, dir, "wwwroot");
    const appPath = path.join(cwd, dir, "index");
    const bootstrapPath = path.join(__dirname, "../../bootstrap/client.tsx");

    const entry: webpack.Entry = {
        index: [bootstrapPath]
    };

    const config = createUmdConfig(entry, outputPath, false);
    config.resolve.alias = {
        "injected-app-module": appPath,
    };

    let compiler = webpack(config);
    new webpack.ProgressPlugin().apply(compiler);
    compiler.run((err, stats) => {
        if (err)
            console.log(`Error! ${err}`);
        else
            console.log(`Complete. Check output in ${outputPath}`);

        // console.log(stats);
    });
}


