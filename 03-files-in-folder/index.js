const fs = require("fs");
const path = require("path");

const { stdout } = process;

const pathToFolder = path.join(__dirname, "secret-folder");
const options = { withFileTypes: true };

fs.readdir(pathToFolder, options, (err, files) => {
  if (err) throw err;

  stdout.write("⬇️ Result:\n");

  files.forEach((file) => {
    if (file.isFile()) {
      const name = path.basename(file.name).split(".")[0];
      const ext = path.extname(file.name).slice(1);

      fs.stat(path.join(pathToFolder, file.name), (err, stats) => {
        if (err) throw err;

        const size = (stats.size / 1024).toFixed(3);
        stdout.write(`${name} - ${ext} - ${size}kb\n`);
      });
    }
  })
});
