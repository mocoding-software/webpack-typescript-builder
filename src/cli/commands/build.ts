import chalk from "chalk";
import program from "commander";
import webpack from "webpack";
import { createConfigs } from "./config";
import * as path from "path";

interface MultiStats {
  stats: webpack.Stats[];
}

function build(dir: string) {
  const config = createConfigs(dir);
  const compiler = webpack(config);

  // @ts-ignore - The typings are not updated yet
  compiler.run(printResults);
}

function printResults(err: Error, multiStats: MultiStats) {
  process.stdout.write("\n");

  printFiles(multiStats.stats[0], "Client");
  printFiles(multiStats.stats[1], "Server");

  // print only from server
  printErrors(multiStats.stats[1]);
  const warnings = printWarnings(multiStats.stats[1]);
  printSummary(multiStats.stats[1], warnings, "Build");
  process.stdout.write("\n");
}

function printErrors(stats: webpack.Stats) {
  const issues: any = stats.compilation.errors;
  for (const issue of issues) {
    process.stdout.write(chalk.red(issue.message));
    process.stdout.write("\n");
  }
}

function printWarnings(stats: webpack.Stats): number {
  const issues: any = stats.compilation.warnings;
  let warningCount = 0;
  for (const issue of issues) {
    const allWarnings: string = issue.warning.toString();
    const warnings = allWarnings
      .replace("Error: ", chalk.grey(""))
      // tslint:disable-next-line: variable-name
      .replace(/\[(\d+), (\d+)\]: (.+)/g, (_substring, start, end, message) => {
        warningCount++;
        const location = chalk.bold.cyanBright(
          `${issue.module.resource}(${start},${end})`,
        );
        const entry = chalk.grey("[wtb]");
        return chalk.yellow(
          `${entry} WARNING in ${location}\n      ${message}`,
        );
      });
    process.stdout.write(warnings);
  }
  return warningCount;
}

function printFiles(stats: webpack.Stats, name: string) {
  const out = stats.compilation.outputOptions.path;
  const target = stats.compilation.outputOptions.libraryTarget;
  process.stdout.write(`${name} (${target}):\n`);
  for (const chunk of stats.compilation.chunks) {
    for (const file of chunk.files) {
      process.stdout.write(`  ${chalk.green.italic(path.join(out, file))}\n`);
    }
  }
  process.stdout.write("\n");
}

function printSummary(
  stats: webpack.Stats,
  warningsCount: number,
  name: string,
) {
  process.stdout.write(`========== ${chalk.bold(name)}: `);
  printColoredStats(warningsCount, "Warning", chalk.yellow);
  process.stdout.write(", ");
  printColoredStats(stats.compilation.errors.length, "Error");
  process.stdout.write(" ========== \n");
}

function printColoredStats(
  stat: number,
  name: string,
  errorChulk: chalk.Chalk = chalk.red,
) {
  const type = stat > 0 ? errorChulk : chalk.green;

  process.stdout.write(type(`${stat} ${name}`));
  process.stdout.write(type(stat === 1 ? "" : "s"));
}

program.command("build <dir>").action(build);
