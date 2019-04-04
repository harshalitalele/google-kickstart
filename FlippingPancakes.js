var fs  = require("fs");

var lineCnt = 0;
fs.readFileSync('./file.in').toString().split('\n').forEach(function (line) {
    if(lineCnt === 0) {
        num_test_cases = parseInt(line);
    } else {
        var caseInput = line.split(" "),
            pancakeOrder = caseInput[0],
            flipperSize = parseInt(caseInput[1]);
        var ans = getMinFlipTimes(pancakeOrder, flipperSize);
        /*if(lineCnt == num_test_cases) {
            return;
        }*/
        fs.appendFileSync("./file.out", "Case #" + lineCnt + ": " + ans + "\n");
    }
    lineCnt++;    
});

function strSplice(s, start, delCount, newSubStr) {
    return s.slice(0, start) + newSubStr + s.slice(parseInt(start) + Math.abs(delCount));
};

function getMinFlipTimes(pancakes, k) {
    var fblank = pancakes.indexOf('-'),
        flipCnt = 0;
    while(fblank != -1) {
        if(pancakes.length < fblank+k) {
            return "impossible";
        } else {
            flipCnt++;
            for(var i = fblank; i < fblank+k; i++) {
                var currentChar = pancakes[i];
                if(currentChar == '+') {
                    pancakes = strSplice(pancakes, i,1,'-');
                } else if(currentChar == '-') {
                    pancakes = strSplice(pancakes, i,1,'+');
                }
            }
            fblank = pancakes.indexOf('-')
        }        
    }
    return flipCnt;
}
