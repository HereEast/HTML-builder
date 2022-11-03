const fs = require("fs");
const path = require("path");
const readline = require("readline");

const { stdin, stdout } = process;
const pathToFile = path.join(__dirname, "text.txt");

fs.writeFile(pathToFile, "",
    err => {
        if(err) throw err;
});

stdout.write("Would you like some milk, sir?\n");

const rl = readline.createInterface(stdin, stdout);

rl.on("line", line => {
    if(line === "exit") {
        close();
    } else {
        fs.appendFile(pathToFile, line + "\n", err => {
            if(err) throw err;
        });
    }
})

rl.on("SIGINT", () => close());

function close() {
    rl.close();
    stdout.write("Good day, sir!\n");
}
