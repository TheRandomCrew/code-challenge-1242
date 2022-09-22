import * as fs from 'fs'
import * as readline from 'readline'
import { Interface } from 'readline'
import { FileError, FatalError } from '../../interface/error'

const pathExists = async (path: fs.PathLike): Promise<boolean> => {
  try {
    await fs.promises.access(path)
    return true
  } catch {
    return false
  }
}

/**
 * Edit a file with the output param value
 * @param {fs.PathLike} filePath
 * @param {string} output
 */
const writeFile = async (
  filePath: fs.PathLike,
  output: string
): Promise<void> => {
  try {
    fs.writeFileSync(filePath, output)
  } catch (error) {
    throw new FatalError(JSON.stringify(error))
  }
}

/**
 * Read a file from a path and return a fs.ReadStream variable
 * @param {fs.PathLike} filePath
 */
const readFile = async (filePath: fs.PathLike): Promise<fs.ReadStream> => {
  try {
    const readStream = pathExists(filePath)
      .then(() => {
        const readableStream = fs.createReadStream(filePath)

        readableStream.on('error', (error) => {
          throw new FatalError(`error: ${error.message}`)
        })
        return readableStream
      })
      .catch(() => {
        throw new FileError("File provided don't exists")
      })
    return await readStream
  } catch (error) {
    throw new FatalError(JSON.stringify(error))
  }
}

/**
 * Read a file from a path and execute a callback in each line of the file, returns a Promise that is resolved when the file has been fully read
 * @param {fs.PathLike} filePath
 * @param {(line: string) => void} onLine
 */
const lineReader = async (
  filePath: fs.PathLike,
  onLine: (line: string) => void
): Promise<Interface> => {
  return await new Promise((resolve, reject) => {
    try {
      readFile(filePath)
        .then((input) => {
          const lineReader = readline.createInterface({
            input
          })
          lineReader.on('line', onLine)
          lineReader.on('close', function () {
            resolve(lineReader)
          })
        })
        .catch((error) => reject(error))
    } catch (error) {
      reject(error)
    }
  })
}

export { lineReader, writeFile }
