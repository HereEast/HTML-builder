const fs = require("fs");
const path = require("path");

const { stdout } = process;

const readableStream = fs.createReadStream(
    path.join(__dirname, "text.txt"), 
    "utf-8"
);

readableStream.on("data", data => {
    stdout.write("⬇️ Result:\n");
    stdout.write(data);
});
readableStream.on("error", error => console.error(error.message));
