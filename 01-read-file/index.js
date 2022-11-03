const fs = require("fs");
const path = require("path");

const readableStream = fs.createReadStream(
    path.join(__dirname, "text.txt"), 
    "utf-8"
);

const { stdout } = process;

readableStream.on("data", data => stdout.write(data));
readableStream.on("error", error => console.error(error.message));