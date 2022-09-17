import process from "node:process";
import { lineReader } from "./features/files";
import { onLine, Statistics } from "./features/names";
import { checkArgs } from "./interface/cli";
import { terminate } from "./interface/error/process";

const args = process.argv;

checkArgs(args);

// create object to pass to inLine, it would have state and methods to add names and process them
const statistics = new Statistics();

const processFile = lineReader(
  args[2],
  (line) => {
    onLine(
      line,
      statistics.addFullName.bind(statistics),
      statistics.addFirstName.bind(statistics),
      statistics.addLastName.bind(statistics)
    );
  },
  () =>  statistics
);

const exitHandler = terminate(processFile, {
  coredump: args[3] === "--with-core-dump" || false,
  timeout: 500,
});

process.on("uncaughtException", exitHandler(1, "Unexpected Error"));
process.on("unhandledRejection", exitHandler(1, "Unhandled Promise"));
process.on("SIGTERM", exitHandler(0, "SIGTERM"));
process.on("SIGINT", exitHandler(0, "SIGINT"));