const fs = require("fs");
const path = require("path");

const sourceFolder = path.join(__dirname, "files");
const destFolder = path.join(__dirname, "files-copy");

//
copyFolder(sourceFolder, destFolder);
//

// Folder
function copyFolder(source, dest) {
  fs.rm(dest, { recursive: true, force: true }, (err) => {
    if (err) throw err;

    fs.mkdir(dest, { recursive: true }, (err) => {
      if (err) throw err;

      copyFiles(source, dest);
    });
  });
}

// Files
function copyFiles(source, dest) {
  fs.readdir(source, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const sourcePath = path.join(source, file.name);
      const destPath = path.join(dest, file.name);

      if (file.isDirectory()) {
        copyFolder(sourcePath, destPath);
      } else {
        fs.copyFile(sourcePath, destPath, (err) => {
          if (err) throw err;
        });
      }
    });
  });
}
