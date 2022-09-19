import process from "node:process";
import { lineReader, writeFile } from "./features/files";
import { onLine, Statistics, ModifiedNamesList } from "./features/names";
import { checkArgs } from "./interface/cli";
import { terminate } from "./interface/error/process";
import {
  writeModifiedNamesToFile,
  writeStatisticsToFile,
} from "./interface/output";

const args = process.argv;

const N = Number(process.argv[3]?.split("N=")[1]) ?? null;

checkArgs(args);

const statistics = new Statistics();
const modifiedNamesList = new ModifiedNamesList(N);

lineReader(args[2], (line) => {
  onLine(
    line,
    statistics.addFullName.bind(statistics),
    statistics.addFirstName.bind(statistics),
    statistics.addLastName.bind(statistics),
    modifiedNamesList.addUniqueFullName.bind(modifiedNamesList)
  );
}).then(async (lineReader) => {
  let output = writeStatisticsToFile(statistics);
  output += `\n${writeModifiedNamesToFile(modifiedNamesList)}`;
  await writeFile("./output.txt", output);
  console.log("Please check your output file");

  const exitHandler = terminate(lineReader, {
    coredump: args[3] === "--with-core-dump" || false,
    timeout: 500,
  });

  process.on("uncaughtException", exitHandler(1, "Unexpected Error"));
  process.on("unhandledRejection", exitHandler(1, "Unhandled Promise"));
  process.on("SIGTERM", exitHandler(0, "SIGTERM"));
  process.on("SIGINT", exitHandler(0, "SIGINT"));
  process.exit(0);
});
