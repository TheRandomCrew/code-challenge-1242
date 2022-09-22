import path from 'node:path'
import process from 'node:process'
import { lineReader, writeFile } from './features/files'
import { onLine, Statistics, ModifiedNamesList } from './features/names'
import { checkArgs } from './interface/cli'
import { terminate } from './interface/error'
import {
  writeModifiedNamesToFile,
  writeStatisticsToFile
} from './interface/output'

const args = process.argv

const { inputPath, N, withCoreDump } = checkArgs(args)

// create object to pass to inLine, it would have state and methods to add names and process them
const statistics = new Statistics()
const modifiedNamesList = new ModifiedNamesList(N as number)

lineReader(inputPath, (line): void => {
  onLine(
    line,
    statistics.addFullName.bind(statistics),
    statistics.addFirstName.bind(statistics),
    statistics.addLastName.bind(statistics),
    modifiedNamesList.addUniqueFullName.bind(modifiedNamesList)
  )
})
  .then(async (lineReader) => {
    let output = writeStatisticsToFile(statistics)
    output += `\n${writeModifiedNamesToFile(modifiedNamesList)}`

    try {
      await writeFile(path.join(__dirname, '..', 'output.txt'), output)
    } catch (error) {
      console.error(error)
    }

    const exitHandler = terminate(lineReader, {
      coredump: withCoreDump as boolean,
      timeout: 500
    })
    process.on('uncaughtException', exitHandler(1, 'Unexpected Error'))
    process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'))
    process.on('SIGTERM', exitHandler(0, 'SIGTERM'))
    process.on('SIGINT', exitHandler(0, 'SIGINT'))
    process.exit(0)
  })
  .catch(() => process.exit(1))
