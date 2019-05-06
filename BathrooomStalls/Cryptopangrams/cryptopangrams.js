var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

var lineCnt = 0,
    testCases = 0,
    nl, n, l, list, ans;
rl.on('line', function(line) {
    if (lineCnt === 0) {
        testCases = parseInt(line);        
    } else if (lineCnt % 2 == 1) {
        nl = line.split(" ");
        n = Number(nl[0]);
        l = Number(nl[1]);
    } else if(lineCnt % 2 == 0 && lineCnt < 2*testCases+1) {
        list = line.split(" ");
        ans = getPangram(list);
        console.log("Case #" + lineCnt/2 + ": " + ans);
    } 
    lineCnt++;
    if(lineCnt > 2*testCases) {
        rl.close();
    }
}).on('close',function(){
    process.exit(0);
});

var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
function getPangram(list) {
    var prevFacts = getFactors(list[0]),
        allSortedFacts = [],
        pangramSeq = [],
        ans = "";
    allSortedFacts = allSortedFacts.concat(prevFacts);
    for(var i = 1; i < list.length; i++) {
        var curFacts = getPrevCurNums(list[i], prevFacts);
        prevFacts = [curFacts.pop()];
        pangramSeq = pangramSeq.concat(curFacts);
        if(allSortedFacts.indexOf(prevFacts[0]) == -1) {
            allSortedFacts.push(prevFacts[0]);
        }
    }
    pangramSeq.push(prevFacts[0]);
    allSortedFacts.sort(function(a, b) {
        return a - b;
    });
    
    for(var i in pangramSeq) {
        var code = pangramSeq[i],
            charCode = allSortedFacts.indexOf(code);
        ans += chars[charCode];
    }
    
    return ans;
}

function getPrevCurNums(curNum, facts) {
    var factsList = [];
    for(var i = 0; i < facts.length; i++) {
        var nextFact = curNum / facts[i];
        if(Number.isInteger(nextFact)) {
            factsList.push(facts[i]);
            factsList.push(nextFact);
        } else {
            factsList.push(facts[i]);
        }
    }
    return factsList;
}

function getFactors(num) {
    var half = Math.floor(num / 2),
        facts = [],
        i, j;
    
    num % 2 === 0 ? (i = 2, j = 1) : (i = 3, j = 2);

    for (i; i < half; i += j) {
        num % i === 0 ? facts.push(i) && facts.push(num / i) : false;
        half = num / i;
    }
    return facts;
}
