import Statistics from "./class";
type NamesState = { [key: string]: number };

const onLine = (
  line: string,
  addFullName: (fullName: string) => void,
  addFirstName: (fullName: string) => void,
  addLastName: (fullName: string) => void
) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match#using_match
  const matches = line.match(/(.*), (.*) -- .*/); // Notice I am not capturing the last word
  if (!matches) return;
  const [input, lastName, firstName] = matches; // Check what (.*) captures

  const fullName = input.split(" -- ")[0].trim();
  addFirstName(firstName);
  addLastName(lastName);
  addFullName(fullName);
};

export { onLine, NamesState, Statistics };
