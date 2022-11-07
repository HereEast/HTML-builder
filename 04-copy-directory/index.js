const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "files");
const dest = path.join(__dirname, "copy");

function copyFolder(src, dest) {
    fs.rm(dest, { recursive: true, force: true }, err => {
        if(err) throw err;

        fs.mkdir(dest, { recursive: true }, err => {
            if(err) throw err;

            copyFiles(src, dest);
        });
    });

    function copyFiles(src, dest) {
        fs.readdir(src, { withFileTypes: true }, (err, files) => {
            if(err) throw err;
            
            files.forEach(file => {
                const srcPath = path.join(src, file.name);
                const destPath = path.join(dest, file.name);
    
                if(file.isDirectory()) {
                    copyFolder(srcPath, destPath);
                } else {
                    fs.copyFile(srcPath, destPath, err => {
                        if(err) throw err;
                    });
                }
            })
        });
    }
}

copyFolder(src, dest);