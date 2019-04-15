var fs  = require("fs");

var lineCnt = 0,
    k = 0,
    v = [];
fs.readFileSync('./file.in').toString().split('\n').forEach(function (line) {
    if(lineCnt === 0) {
        num_test_cases = parseInt(line);
    } else if(lineCnt % 2 == 1) {
        var nk = line.split(" ");
        k = parseInt(nk[1]);
    } else if(lineCnt % 2 == 0) {
        v = line.split(" ");
        var ans = expectedValue(line);
        fs.appendFileSync("./file.out", "Case #" + lineCnt/2 + ": " + ans + "\n");
    }
    lineCnt++;    
});

function expectedValue() {
    var totalCnt = v.length,
        numCntMap = getCnts(v),
        expVal =  0,
        highestVal = Math.max(...v),
        highestValOdds = 1 - (numCntMap[highestVal] / totalCnt);
    
    for(var num in numCntMap) {
        var cnt = numCntMap[num];
        if(num == highestVal) {
            expVal += getHighestValProb(cnt, totalCnt, k)*num;
        } else {
            expVal += getNumValue(cnt, totalCnt, highestValOdds, k)*num;
        }
    }
    
    return expVal;
}

function getCnts(v) {
    var numCntMap = {};
    
    for(var i in v) {
        v[i] = Number(v[i]);
        var num = v[i];
        if(!numCntMap.hasOwnProperty(num)) {
            numCntMap[num] = 1;
        } else {
            numCntMap[num]++;
        }
    }
    return numCntMap;
}

function getHighestValProb(cnt, totalCnt, k) {
    var prob = 0,
        favor = cnt / totalCnt,
        odds = 1 - favor;
    for(var i = 0; i <= k; i++) {
        prob += Math.pow(odds, i) * favor;
    }
    return prob;
}

function getNumValue(cnt, totalCnt, highestValOdds, k) {
    return Math.pow(highestValOdds, k) * (cnt / totalCnt);
}
