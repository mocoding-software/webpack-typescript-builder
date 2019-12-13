import program from "commander"
import * as webpack from "webpack";
import { WebpackConfigBuilder } from "./WebpackConfigBuilder";
import * as path from "path";

program.version("0.0.1")
  .description("Webpack typescript builder!")
  .command("build <client> <output>")
  //.description("Builds something")
  .action((client: string, output: string) => {
    const cwd = process.cwd()
    console.log(`Building ${client} in ${cwd}` );    
    const clientEntry: webpack.Entry = {
      index: [client]
    };
    const clientConfigBuilder = new WebpackConfigBuilder(clientEntry);
    const config = clientConfigBuilder.toUmdConfig(path.join(cwd, output));

    let compiler = webpack.default(config);
    new webpack.ProgressPlugin().apply(compiler);
    compiler.run(function(err, stats) {
      console.log(stats)
    });
  });

program.parse(process.argv);
