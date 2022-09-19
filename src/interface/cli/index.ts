const getHelpText = () => {
  const helpText = `
  code-challenge-1242 is a simple cli program to demonstrate how to handle files using streams.
  usage:
      code-challenge-1242 <path_to_file> [N=25]

      <path_to_file> is the path to the input file you want to work with.
      N is the number of Unique names to output, defaults to 25

  `;
  console.log(helpText);
};

const checkArgs = (args: string[]) => {
  if (args.length < 3) {
    getHelpText();
    process.exit(0);
  } else if (args.length > 3) {
    console.log("More arguments provided than expected");
    getHelpText();
    process.exit(0);
  } else {
    if (!args[2]) {
      console.log("This tool requires at least one path to a file");
      getHelpText();
      process.exit(0);
    }
  }
};

export { checkArgs };
