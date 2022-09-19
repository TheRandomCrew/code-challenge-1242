import * as fs from "fs";
import * as readline from "readline";
import { Interface } from "readline";

const writeFile = async (filePath: fs.PathLike, output: string) => {
  try {
    await fs.promises.writeFile(filePath, output);
  } catch (error) {
    console.error(error);
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
): Promise<Interface> => {
  return new Promise((resolve, reject) => {  
    try {
      const lineReader = readline.createInterface({
        input: readFile(filePath),
      });      
      lineReader.on("line", onLine);
      lineReader.on("close", async function () {
        resolve(lineReader);
      });
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
};

export { lineReader, writeFile };
