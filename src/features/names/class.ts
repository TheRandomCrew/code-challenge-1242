import { NamesState } from ".";

export class Statistics {
  fullNames: NamesState = {};
  firstNames: NamesState = {};
  lastNames: NamesState = {};

  static cardinality(object: NamesState) {
    return Object.keys(object).length;
  } 

  static top10(object: NamesState) {
    return Object.entries(object)
      .sort(
        (
          [_prev, prevCount]: [string, unknown],
          [_current, currentCount]: [string, unknown]
          ) => Number(currentCount) - Number(prevCount)
          )
          .slice(0, 10);
  }
        
  addFullName(fullName: string) {
    if (!this.fullNames[fullName]) this.fullNames[fullName] = 0;
    this.fullNames[fullName] += 1;
  }

  addFirstName(firstName: string) {
    if (!this.firstNames[firstName]) this.firstNames[firstName] = 0;
    this.firstNames[firstName] += 1;
  }

  addLastName(lastName: string) {
    if (!this.lastNames[lastName]) this.lastNames[lastName] = 0;
    this.lastNames[lastName] += 1;
  }

  get uniqueFullNamesCount() {
    return Statistics.cardinality(this.fullNames);
  }

  get uniqueFirstNamesCount() {
    return Statistics.cardinality(this.firstNames);
  }

  get uniqueLastNamesCount() {
    return Statistics.cardinality(this.lastNames);
  }

  get top10LastNames() {
    return Statistics.top10(this.lastNames);
  }

  get top10FirstNames() {
    return Statistics.top10(this.firstNames);
  }
}

export class ModifiedNamesList {
  static #MAX_NUMBER_OF_NAMES: number = 25;
  uniqueFullNames: { firstName: string, lastName: string }[] = [];

  addUniqueFullName(firstName: string, lastName: string) {
    const isUnique = this.uniqueFullNames.findIndex((fullName) => fullName.firstName === firstName || fullName.lastName === lastName) === -1;

    if (isUnique) this.uniqueFullNames.push({ firstName, lastName });
  }

  static #getRandomCharCode(name: string) {
    const letters = [...name];

    return letters.map((letter) => letter.charCodeAt(0))[Math.floor(Math.random() * letters.length)];
  }

  static mixNames(listOfNames: { firstName: string, lastName: string }[]) {
    const copy = [...listOfNames].sort((a, b) => this.#getRandomCharCode(a.firstName) - this.#getRandomCharCode(b.firstName));
    const secondCopy = [...listOfNames].sort((a, b) => this.#getRandomCharCode(b.lastName) - this.#getRandomCharCode(a.lastName));

    const result = [];

    for (let i = 0; i < copy.length && i < this.#MAX_NUMBER_OF_NAMES; i++) { 
      result.push(`${copy[i].firstName} ${secondCopy[i].lastName}`);
    }

    return result;
  }
}
