import { ModifiedNamesList } from './../../features/names/class';
import { Statistics } from "../../features/names";

/**
 * Get a Statistics instance and returns a formatted String with the statistics of the names of the list
 * @param {Statistics} statistics 
 *
 */
const writeStatisticsToFile = (statistics: Statistics) => {
  const cardinality = `
Unique full name count: ${statistics.uniqueFullNamesCount}
Unique first name count: ${statistics.uniqueFirstNamesCount}
Unique last name count: ${statistics.uniqueLastNamesCount}
  `;

  const top10LastNames = `
Top 10 last names:
${statistics.top10LastNames
  .map(([name, count]) => `${name}: ${count}`)
  .join("\n")}
  `;

  const top10FirstNames = `
Top 10 first names:
${statistics.top10FirstNames
  .map(([name, count]) => `${name}: ${count}`)
  .join("\n")}
  `;

  const resultOutput = [cardinality, top10LastNames, top10FirstNames].join("");
  return resultOutput;
};

/**
 * Receive a ModifiedNamesList instance and returns a formatted String with the names mixes
 * @param {ModifiedNamesList} modifiedNamesList 
 */
const writeModifiedNamesToFile = (modifiedNamesList: ModifiedNamesList) => {
  return `Modified names list: \n${ ModifiedNamesList.mixNames(modifiedNamesList.uniqueFullNames).join('\n') }` 
}

export { writeStatisticsToFile, writeModifiedNamesToFile };
