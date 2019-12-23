#!/usr/bin/env node

import program from "commander";
import "./commands";

program
  .version("0.0.1")
  .description("Webpack typescript builder!")
  .option("-p, --production", "build for production");

program.parse(process.argv);

// Check the program.args obj
const NO_COMMAND_SPECIFIED = program.args.length === 0;

// Handle it however you like
if (NO_COMMAND_SPECIFIED) {
  // e.g. display usage
  program.help();
}
