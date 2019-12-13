import program from "commander"
import { build } from "./commands"

program.version("0.0.1")
  .description("Webpack typescript builder!")  
  .command("build <dir>").action(build)

program.parse(process.argv);

// Check the program.args obj
var NO_COMMAND_SPECIFIED = program.args.length === 0;

// Handle it however you like
if (NO_COMMAND_SPECIFIED) {
  // e.g. display usage
  program.help();
}