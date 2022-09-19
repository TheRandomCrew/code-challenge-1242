import * as fs from "fs";
import * as readline from "readline";
import { Interface } from "readline";

/**
 * Edit a file with the output param value
 * @param {fs.PathLike} filePath 
 * @param {string} output 
 */
const writeFile = async (filePath: fs.PathLike, output: string) => {
  try {
    await fs.promises.writeFile(filePath, output);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Read a file from a path and return a fs.ReadStream variable
 * @param {fs.PathLike} filePath 
 */
const readFile = (filePath: fs.PathLike) => {
  const readableStream = fs.createReadStream(filePath);

  readableStream.on("error", function (error) {
    console.log(`error: ${error.message}`);
  });
  return readableStream;
};

/**
 * Read a file from a path and execute a callback in each line of the file, returns a Promise that is resolved when the file has been fully read
 * @param {fs.PathLike} filePath 
 * @param {(line: string) => void} onLine
 */
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
