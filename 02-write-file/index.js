const fs = require("fs");
const path = require("path");
const readline = require("readline");

const { stdin, stdout } = process;
const pathToFile = path.join(__dirname, "text.txt");

fs.writeFile(pathToFile, "", (err) => {
  if (err) {
    console.error(`⛔️Error happened: ${err.message}`);
  }
});

stdout.write("💬Would you like some milk, sir?\n");

const rl = readline.createInterface(stdin, stdout);

rl.on("line", (line) => {
  if (line === "exit") {
    rl.close();
  } else {
    const newLine = line + "\n";

    fs.appendFile(pathToFile, newLine, (err) => {
      if (err) {
        console.error(`⛔️Error happened: ${err.message}`);
      }
    });
  }
});

rl.on("close", () => stdout.write("👋Good day, sir!\n"));
rl.on("SIGINT", () => rl.close());
