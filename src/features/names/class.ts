import { NamesState } from '.'

/**
 * Receive a list with numbers and returns some statistics about that names, how is:
 * - The cardinality (count of unique items) of each the three sets of full, last, and first names
 * - The ten most common last names sorted in descending order, including the count of these names.
 * - The ten most common first names sorted in descending order, including the count of these names.
 */
export class Statistics {
  fullNames: NamesState = {}
  firstNames: NamesState = {}
  lastNames: NamesState = {}

  /**
   * Get the cardinality of an object
   * @param {NamesState} object
   */
  static cardinality(object: NamesState): number {
    if (typeof object !== 'object') return 0
    return Object.keys(object).length
  }

  /**
   * Receive an object whose values are numbers, and return a sorted descending list of top 10 bigger values
   * @param {NamesState} object
   */
  static top10(object: NamesState): Array<[string, number]> {
    if (this.cardinality(object) === 0) return []
    return Object.entries(object)
      .sort(
        (
          [_prev, prevCount]: [string, unknown],
          [_current, currentCount]: [string, unknown]
        ) => Number(currentCount) - Number(prevCount)
      )
      .slice(0, 10)
  }

  /**
   * Create a new key in the fullNames' state, with the number of times that the key have been added to the object
   * @param {string} fullName
   */
  addFullName(fullName: string): void {
    if (isNaN(this.fullNames[fullName])) this.fullNames[fullName] = 0
    this.fullNames[fullName] += 1
  }

  /**
   * Create a new key in the firstNames' state, with the number of times that the key have been added to the object
   * @param {string} firstName
   */
  addFirstName(firstName: string): void {
    if (isNaN(this.firstNames[firstName])) this.firstNames[firstName] = 0
    this.firstNames[firstName] += 1
  }

  /**
   * Create a new key in the lastNames' state, with the number of times that the key have been added to the object
   * @param {string} lastName
   */
  addLastName(lastName: string): void {
    if (isNaN(this.lastNames[lastName])) this.lastNames[lastName] = 0
    this.lastNames[lastName] += 1
  }

  /**
   * Get the cardinality of fullNames object
   */
  get uniqueFullNamesCount(): Number {
    return Statistics.cardinality(this.fullNames)
  }

  /**
   * Get the cardinality of firstNames object
   */
  get uniqueFirstNamesCount(): Number {
    return Statistics.cardinality(this.firstNames)
  }

  /**
   * Get the cardinality of lastNames object
   */
  get uniqueLastNamesCount(): Number {
    return Statistics.cardinality(this.lastNames)
  }

  /**
   * Get a descending list of top 10 more used lastNames
   */
  get top10LastNames(): Array<[string, number]> {
    return Statistics.top10(this.lastNames)
  }

  /**
   * Get a descending list of top 10 more used FirstNames
   */
  get top10FirstNames(): Array<[string, number]> {
    return Statistics.top10(this.firstNames)
  }
}

/**
 * Create a list with unique names and mix it, creating a list of new unique names
 */
export class ModifiedNamesList {
  static #maxNumberOfNames: number

  constructor(limit?: number) {
    ModifiedNamesList.#maxNumberOfNames = limit ?? 25
  }

  uniqueFullNames: Array<{ firstName: string; lastName: string }> = []

  /**
   * Add a fullName on the list just in case the firstName and the lastName weren't already on the list
   * @param {string} firstName
   * @param {string} lastName
   */
  addUniqueFullName(firstName: string, lastName: string): void {
    const isRepeated = this.uniqueFullNames.some(
      (fullName) =>
        fullName.firstName === firstName || fullName.lastName === lastName
    )

    const isListCompleted =
      this.uniqueFullNames.length === ModifiedNamesList.#maxNumberOfNames

    if (!isRepeated && !isListCompleted) {
      this.uniqueFullNames.push({ firstName, lastName })
    }
  }

  /**
   * Combine the list of names returning a new list  mix of firstNames with lastNames
   * @param {{ firstName: string, lastName: string }} listOfNames
   */
  static mixNames(
    listOfNames: Array<{ firstName: string; lastName: string }>
  ): string[] {
    if (listOfNames.length === 0) return []

    const result: string[] = listOfNames.reduce<string[]>(
      (result, _currentName, index, names) => {
        const firstName = names.slice(index)[0].firstName
        const lastName = names.slice(index - 1)[0].lastName

        return [...result, `${lastName}, ${firstName}`]
      },
      []
    )

    return result
  }
}
