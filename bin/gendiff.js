import { Command } from "commander";
import genDiff from "../src/index.js";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0", "-V, --version", "output the version number")
  .helpOption("-h, --help", "display help for command")
  .argument("<filepath1>", "path to first configuration file")
  .argument("<filepath2>", "path to second configuration file")
  .option("-f, --format [type]", "output format")
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2, option.format);
    console.log(diff);
  });

program.parse();
