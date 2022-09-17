import fs from "fs";
import readline from "readline";
import { writeStatisticsToFile } from "../../interface/output";
import { Statistics } from "../names";

const writeFile = async (filePath: fs.PathLike, output: string) => {
  try {
    await fs.promises.writeFile(filePath, output);
  } catch (error) {
    console.error;
  }
};

const readFile = (filePath: fs.PathLike) => {
  const readableStream = fs.createReadStream(filePath);

  readableStream.on("error", function (error) {
    console.log(`error: ${error.message}`);
  });
  return readableStream;
};

const lineReader = (
  filePath: fs.PathLike,
  onLine: (line: string) => void,
  callBack: () => Statistics
) => {
  const lineReader = readline.createInterface({
    input: readFile(filePath),
  });

  lineReader.on("line", onLine);
  lineReader.on("close", async function () {
    const statistics = callBack();
    const output = await writeStatisticsToFile(statistics);
    await writeFile("./output.txt", output);
    console.log("Please check your output file");
    process.exit(0);
  });

  return lineReader;
};

export { lineReader };
