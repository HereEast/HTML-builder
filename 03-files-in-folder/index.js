const fs = require("fs");
const path = require("path");
const { stdout } = process;

const pathToFolder = path.join(__dirname, "secret-folder");

fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
    if(err) throw err;

    for(let file of files) {
        if(file.isFile()) {
            const name = path.basename(file.name).split(".")[0];
            const ext = path.extname(file.name).replace(/\./g, "");

            fs.stat(path.join(pathToFolder, file.name), (err, stats) => {
                if(err) throw err;

                const size = (stats.size / 1024).toFixed(3);
                stdout.write(`${name} - ${ext} - ${size}kb\n`);
            });
        }
    }
});
