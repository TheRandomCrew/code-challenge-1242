import { NamesState } from ".";

export class Statistics {
  fullNames: NamesState = {};
  firstNames: NamesState = {};
  lastNames: NamesState = {};

  /**
   * Get the cardinality of an object
   * @param {NamesState} object
  */
  static cardinality(object: NamesState): number {
    return Object.keys(object).length;
  }

  /**
   * Receive an object whose values are numbers, and return a sorted descending list with the top 10 bigger values
   * @param {NamesState} object
   */
  static top10(object: NamesState): [string, number][] {
    return Object.entries(object)
      .sort(
        (
          [_prev, prevCount]: [string, unknown],
          [_current, currentCount]: [string, unknown]
        ) => Number(currentCount) - Number(prevCount)
      )
      .slice(0, 10);
  }

  /**
   * Create a new key in the fullNames' state, with the number of times that the key have been added to the object
   * @param {string} fullName 
   */
  addFullName(fullName: string) {
    if (!this.fullNames[fullName]) this.fullNames[fullName] = 0;
    this.fullNames[fullName] += 1;
  }

  /**
   * Create a new key in the firstNames' state, with the number of times that the key have been added to the object
   * @param {string} firstName 
   */
  addFirstName(firstName: string) {
    if (!this.firstNames[firstName]) this.firstNames[firstName] = 0;
    this.firstNames[firstName] += 1;
  }

  /**
   * Create a new key in the lastNames' state, with the number of times that the key have been added to the object
   * @param {string} firstName 
   */
  addLastName(lastName: string) {
    if (!this.lastNames[lastName]) this.lastNames[lastName] = 0;
    this.lastNames[lastName] += 1;
  }

  /**
   * Get the cardinality of fullNames object
   */
  get uniqueFullNamesCount() {
    return Statistics.cardinality(this.fullNames);
  }

  /**
   * Get the cardinality of firstNames object
   */
  get uniqueFirstNamesCount() {
    return Statistics.cardinality(this.firstNames);
  }

  /**
   * Get the cardinality of lastNames object
   */
  get uniqueLastNamesCount() {
    return Statistics.cardinality(this.lastNames);
  }

  /**
   * Get a descending list the top10 more used lastNames
   */
  get top10LastNames() {
    return Statistics.top10(this.lastNames);
  }

  get top10FirstNames() {
    return Statistics.top10(this.firstNames);
  }
}

export class ModifiedNamesList {
  static #maxNumberOfNames: number;

  constructor(limit?: number) {
    ModifiedNamesList.#maxNumberOfNames = limit || 25; 
  }

  uniqueFullNames: { firstName: string, lastName: string }[] = [];

  addUniqueFullName(firstName: string, lastName: string) {
    const isRepeated =
      this.uniqueFullNames.some(
        (fullName) =>
          fullName.firstName === firstName || fullName.lastName === lastName
      );

    const isListCompleted = this.uniqueFullNames.length === ModifiedNamesList.#maxNumberOfNames;

    if (!isRepeated && !isListCompleted) this.uniqueFullNames.push({ firstName, lastName });
  }

  static mixNames(listOfNames: { firstName: string, lastName: string }[]): string[] {
    if (!listOfNames.length) return [];

    const result: string[] = listOfNames.reduce((result, _currentName, index, names) => {
      const firstName = names.slice(index)[0].firstName;
      const lastName = names.slice(index - 1)[0].lastName;

      return [...result, `${lastName}, ${firstName}`];
    }, [] as string[]);

    return result;
  }
}
