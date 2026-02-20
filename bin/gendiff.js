import { Command } from "commander";
import genDiff from "../src/index.js";
import path from "node:path";
import process from "node:process";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two configuration files and shows a difference.")
  .version("1.0.0", "-V, --version", "output the version number")
  .helpOption("-h, --help", "display help for command")
  .argument("<filepath1>", "path to first configuration file")
  .argument("<filepath2>", "path to second configuration file")
  .option("-f, --format [type]", "output format")
  .action((filepath1, filepath2, options) => {
    try {
      const absolutePath1 = path.resolve(process.cwd(), filepath1);
      const absolutePath2 = path.resolve(process.cwd(), filepath2);

      const diff = genDiff(absolutePath1, absolutePath2);
      console.log(diff);
    } catch (e) {
      console.e("Error:", e.message);
      process.exit(1);
    }
  });

program.parse();
