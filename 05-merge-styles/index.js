const path = require("path");
const fs = require("fs");

const sourceFolderPath = path.join(__dirname, "styles");
const distFilePath = path.join(__dirname, "project-dist", "bundle.css");

//
fs.writeFile(distFilePath, "", () => {
  console.log("File bundle.css is created...");

  fs.readdir(sourceFolderPath, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const ext = path.extname(file.name).slice(1);

      if (file.isFile() && ext === "css") {
        const filePath = path.join(sourceFolderPath, file.name);

        // fs.readFile(filePath, "utf-8", (err, data) => {
        //   if(err) throw err;

        //   fs.appendFile(distFilePath, "\n" + data, (err) => {
        //     if(err) throw err;

        //     console.log(`✅${file.name} styles are added to bundle.css`);
        //   });
        // });

        const readStream = fs.createReadStream(filePath, "utf-8");
        const writeStream = fs.createWriteStream(distFilePath, { flags: "a" });

        readStream.on("data", (chunk) => {
          writeStream.write(chunk);
        });

        readStream.on("end", () => console.log(`✅${file.name} styles are added to bundle.css`));
        readStream.on("error", (err) => console.error(err.message));
      }
    });
  });
});



