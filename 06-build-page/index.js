const path = require("path");
const fs = require("fs");

const destPath = path.join(__dirname, "project-dist");
const assetsPath = path.join(__dirname, "assets");
const componentsPath = path.join(__dirname, "components");
const sourceStylesPath = path.join(__dirname, "styles");

//
//
fs.rm(destPath, { recursive: true, force: true }, (err) => {
  if (err) throw err;

  fs.mkdir(destPath, { recursive: true }, (err) => {
    if (err) throw err;
    console.log("ℹ️ Folder project-dist was created.");

    createHTML();
    createCSS(path.join(destPath, "style.css"), sourceStylesPath);
    copyFolder(assetsPath, path.join(destPath, "assets"));
  });
})

//
//
function createHTML() {
  fs.readFile(path.join(__dirname, "template.html"), "utf-8", (err, templateHtml) => {
    if (err) throw err;

    fs.writeFile(path.join(destPath, "index.html"), templateHtml, (err) => {
      if (err) throw err;
      console.log("ℹ️ File index.html was created.");

      fs.readFile(path.join(destPath, "index.html"), "utf-8", (err, html) => {
        if (err) throw err;

        let indexHtml = html;

        // Replace tags
        fs.readdir(componentsPath, { withFileTypes: true }, (err, files) => {
          if (err) throw err;

          for (const file of files) {
            if (!file.isFile() || !file.name.includes(".html")) continue;

            const tag = file.name.split(".")[0];
            const filePath = path.join(componentsPath, file.name);

            fs.readFile(filePath, "utf-8", (err, componentHtml) => {
              if (err) throw err;

              indexHtml = indexHtml.replace(`{{${tag}}}`, componentHtml);

              fs.writeFile(path.join(destPath, "index.html"), indexHtml, (err) => {
                if (err) throw err;
              });
            });
          }
        });
        //
      });
    });
  });
}

//
// Merge css styles
function createCSS(destPath, sourcePath) {
  fs.writeFile(destPath, "", () => {
    console.log("ℹ️ File style.css was created.");

    fs.readdir(sourcePath, { withFileTypes: true }, (err, files) => {
      if (err) throw err;

      files.forEach((file) => {
        const ext = path.extname(file.name).slice(1);

        if (file.isFile() && ext === "css") {
          const filePath = path.join(sourcePath, file.name);

          const readStream = fs.createReadStream(filePath, "utf-8");
          const writeStream = fs.createWriteStream(destPath, { flags: "a" });

          readStream.on("data", (chunk) => {
            writeStream.write(chunk);
          });

          readStream.on("end", () => console.log(`✅${file.name} merged to style.css`));
          readStream.on("error", (err) => console.error(err.message));
        }
      });
    });
  });
}

//
// Copy folder
function copyFolder(source, dest) {
  fs.rm(dest, { recursive: true, force: true }, (err) => {
    if (err) throw err;

    fs.mkdir(dest, { recursive: true }, (err) => {
      if (err) throw err;

      copyFiles(source, dest);
    });
  });
}

//
// Copy files
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
