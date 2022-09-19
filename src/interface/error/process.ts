import { Interface } from "readline";

/**
 * Terminate the process in the user's terminal
 * @param {Interface} lineReader 
 * @param {{ coredump: boolean, timeout: number }} options 
 */
function terminate(
  lineReader: Interface,
  options = { coredump: false, timeout: 500 }
) {
  return (code: number, reason: string) =>
    (err: { message: string; stack: any }, _: any) => {
      if (err && err instanceof Error) {
        console.log(err.message, err.stack);
      }

      // Exit function
      const exit = () => {
        options.coredump ? process.abort() : process.exit(code);
      };

      // Attempt a graceful shutdown
      lineReader.close();
      setTimeout(exit, options.timeout).unref();
    };
}

export { terminate };
