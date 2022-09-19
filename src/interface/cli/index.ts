import { ArgumentsError } from '../error'

interface Args {
  inputPath: string
  N: Number
  withCoreDump: Boolean
}

/**
 * Show a informative text on the user's console about how to use the tool
 */
const getHelpText = (): void => {
  const helpText = `
code-challenge-1242 is a simple cli program to demonstrate how to handle files using streams.

usage:
    code-challenge-1242 <path_to_file> [-N=25]

    <path_to_file> is the path to the input file you want to work with.
    N is the number of Unique names to output, defaults to 25
  `
  console.log(helpText)
}

/**
 * Validate if the user is passing the needed args to run the tool
 */
const checkArgs = (args: string[]): Args => {
  try {
    const response = {
      inputPath: '',
      N: 25,
      withCoreDump: args.includes('--with-core-dump', 3) || false
    }
    if (args.length < 3) {
      throw new ArgumentsError(
        'This tool requires at least one path to a file'
      )
    }
    if (args[2] === '-h' || args[2] === '--help') {
      getHelpText()
      process.exit(0)
    }

    response.inputPath = args[2]
    if (args.length > 4) {
      throw new ArgumentsError('More arguments provided than expected')
    }
    if (args[3] !== '') {
      if (args[3].includes('-N') || args[3].includes('-n')) {
        const N = Number(args[3].split('=')[0])
        if (isNaN(N)) {
          console.log(
            'The given value of N is not valid. We will use the default of 25'
          )
        } else {
          response.N = N
        }
      }
    }
    return response
  } catch (error) {
    if (error instanceof ArgumentsError) console.error(error)
    else console.error(error)

    process.exit(2)
  }
}

export { checkArgs }
