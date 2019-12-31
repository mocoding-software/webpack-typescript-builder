import chalk from "chalk";
import program from "commander";
import * as path from "path";
import webpack from "webpack";

interface MultiStats {
  stats: webpack.Stats[];
}

export function printResults(
  err: Error,
  multiStats: MultiStats,
  printAssets: boolean = true,
) {
  process.stdout.write("\n");

  if (printAssets) {
    printFiles(multiStats.stats[0], "Client");
    printFiles(multiStats.stats[1], "Server");
  }

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
    if (!issue.warning) {
      // Disable webpack compain here.
      // process.stdout.write(chalk.red(issue.error.toString()));
      // process.stdout.write("\n");
      // process.stdout.write(chalk.bold.cyan(issue.module.resource));
      // process.stdout.write("\n");
      // warningCount++;
      continue;
    }
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
  const assets = Object.keys(stats.compilation.assets).filter(
    _ => !_.endsWith("d.ts"),
  );
  for (const asset of assets) {
    const webpackAsset: any = stats.compilation.assets[asset];
    const size: number = webpackAsset.size
      ? webpackAsset.size()
      : webpackAsset.children
      ? webpackAsset.children[0]._value.length
      : webpackAsset._value.length;
    const strSize = (size / 1024).toFixed(2);
    process.stdout.write(
      `  ${chalk.green.italic(path.join(out, asset))} (${strSize} Kb)\n`,
    );
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
