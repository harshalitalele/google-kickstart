var fs  = require("fs");

var lineCnt = 0;
fs.readFileSync('./file.in').toString().split('\n').forEach(function (line) {
    if(lineCnt === 0) {
        num_test_cases = parseInt(line);
    } else if(lineCnt <= num_test_cases) {
        var input = line.split(" "),
            n = Number(input[0]),
            k = Number(input[1]);
        var ans = minMaxDistantSeats(n, k);
        fs.appendFileSync("./file.out", "Case #" + lineCnt + ": " + ans[0] + " " + ans[1] + "\n");
    }
    lineCnt++;    
});

function minMaxDistantSeats(n, k) {
    
    var d = getDivisions(k);
    var ans = n / Math.pow(2, d),
        max = Math.floor(ans),
        min = max;
    if((n/k) % 2 != 1 && min != 0) {
        min--;
    }
    return [max, min];
}

function getDivisions(k) {
	return Math.floor(Math.log(k)/Math.log(2)) + 1;
}
