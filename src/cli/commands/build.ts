import webpack from "webpack";
import { createConfig } from "./config";

export function build(dir: string) {
    const config = createConfig(dir);

    let compiler = webpack(config);
    new webpack.ProgressPlugin().apply(compiler);
    compiler.run((err, stats) => {
        console.log(err);
    });
}


