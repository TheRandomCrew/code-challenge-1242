import { Statistics } from "../../features/names";

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

export { writeStatisticsToFile };
