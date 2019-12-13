import program from "commander"
import * as webpack from "webpack";
import { WebpackConfigBuilder } from "./WebpackConfigBuilder";
import * as path from "path";
import { Dll } from "./dll";

program.version("0.0.1")
  .description("Webpack typescript builder!")
  .command("build <client> <output>")
  //.description("Builds something")
  .action((client: string, output: string) => {

    const cwd = process.cwd();
    const outputPath = path.join(cwd, output)
    const appPath = path.join(cwd, client)
    const bootstrapPath = path.join(__dirname, "bootstrap/client.tsx");

    const clientEntry: webpack.Entry = {
      index: [bootstrapPath]
    };

    const configBuilder = new WebpackConfigBuilder(clientEntry);
    const config = configBuilder.toUmdConfig(outputPath);
    config.resolve.alias = {
      "injected-app-module": appPath,
    };

    let compiler = webpack.default(config);
    compiler.run(function (err2, stats2) {
      console.log(stats2)
    });

    // const tempDir = path.join(cwd, ".tmp")

    // const appDll = new Dll("app", "umd", tempDir);
    // const entry: webpack.Entry = {};
    // entry["app"] = [clientPath];

    // let configBuilder = new WebpackConfigBuilder(entry);
    // const appConfig = configBuilder.toUmdConfig(outputPath, appDll.produce());
    // let appCompiler = webpack.default(appConfig);
    // new webpack.ProgressPlugin().apply(appCompiler);
    // appCompiler.run(function (err, stats) {


    //   configBuilder = new WebpackConfigBuilder(clientEntry);
    //   const config = configBuilder.toUmdConfig(outputPath, appDll.consume());
    //   config.resolve.alias = {
    //     app: clientPath,
    //   };
    //   let compiler = webpack.default(config);
    //   compiler.run(function (err2, stats2) {
    //     console.log(stats2)
    //   });
    // });
  });

program.parse(process.argv);
