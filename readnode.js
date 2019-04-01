var fs  = require("fs");

fs.readFileSync('./file.in').toString().split('\n').forEach(function (line) { 
    console.log(line);
    fs.appendFileSync("./file.out", "out: " + line.toString() + "\n");
});