import { Statistics, ModifiedNamesList } from './class'
interface NamesState { [key: string]: number }

/**
 * Receive a line, get the lastName and firstName and pass it through some callbacks
 * @param {string } line
 * @param {(fullName: string) => void} addFullName
 * @param {(fullName: string) => void} addFirstName
 * @param {(fullName: string) => void} addLastName
 * @param {(firstName: string, lastName: string) => void} addUniqueFullName
 */
const onLine = (
  line: string,
  addFullName: (fullName: string) => void,
  addFirstName: (fullName: string) => void,
  addLastName: (fullName: string) => void,
  addUniqueFullName: (firstName: string, lastName: string) => void
): void => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#using_match
  const matches = line.match(/(.*), (.*) -- .*/) // Notice I am not capturing the last word
  if (matches == null) return
  const [input, lastName, firstName] = matches // Check what (.*) captures

  const fullName = input.split(' -- ')[0].trim()
  addFirstName(firstName)
  addLastName(lastName)
  addFullName(fullName)
  addUniqueFullName(firstName, lastName)
}

export { onLine, NamesState, Statistics, ModifiedNamesList }
