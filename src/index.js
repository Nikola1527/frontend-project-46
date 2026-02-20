import fs from "node:fs";
import path from "node:path";

const genDiff = (filepath1, filepath2) => {
  try {
    const data1 = fs.readFileSync(filepath1, "utf8");
    const data2 = fs.readFileSync(filepath2, "utf8");

    const ext1 = path.extname(filepath1);
    const ext2 = path.extname(filepath2);

    if (ext1 !== ".json" || ext2 !== ".json") {
      throw new Error("Only JSON files are supported for now");
    }

    const obj1 = JSON.parse(data1);
    const obj2 = JSON.parse(data2);

    return JSON.stringify({ obj1, obj2 }, null, 2);
  } catch (e) {
    throw new Error(`Error reading files: ${e.message}`);
  }
};

export default genDiff;
