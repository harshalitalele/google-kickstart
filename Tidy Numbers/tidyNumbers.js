var fs  = require("fs");

var lineCnt = 0;
fs.readFileSync('./file.in').toString().split('\n').forEach(function (line) {
    if(lineCnt === 0) {
        num_test_cases = parseInt(line);
    } else if(lineCnt <= num_test_cases) {
        var ans = getTidyNumber(line);
        fs.appendFileSync("./file.out", "Case #" + lineCnt + ": " + ans + "\n");
    }
    lineCnt++;    
});

function setOtherDigits(num, d) {
    for(var i = d+1; i < num.length; i++) {
        num[i] = 9;
    }
    for(i = d; i > 0; i--) {
        var cur = num[i],
            prev = num[i-1];
        if(cur < prev) {
            num[i-1]--;
            num[i] = 9;
        } else {
            break;
        }
    }
    return num;
}

function getTidyNumber(n) {
    var num = n.trim().split("");
    if(!isTidy(num)) {
        var prevDigit = Number(num[0]);
        for(var i = 1; i < num.length; i++) {
            var digit = Number(num[i]);
            if(digit < prevDigit) {
                num = setOtherDigits(num, i);
                break;
            } else {
                prevDigit = digit;
            }
        }
    }
    if(num[0] == 0) {
        num = num.slice(1);
    }
    num = num.join("");
    return num;
}

function isTidy(n) {
    var num = n.toString(),
        prevDigit = num[0];
    for(var i = 1; i < num.length; i++) {
        var digit = num[i];
        if(digit >= prevDigit) {
            prevDigit = digit;
        } else {
            return false;
        }
    }
    return true;
}
