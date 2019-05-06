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
    allSortedFacts.sort(compare);
    
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
        var nextFact = divide(curNum , facts[i]);
        if(nextFact[1] == 0) {
            factsList.push(facts[i]);
            factsList.push(nextFact[0]);
        } else {
            factsList.push(facts[i]);
        }
    }
    return factsList;
}

function getFactors(num) {
    var half = divide(num, 2)[0],
        facts = [],
        i, j;
    
    !isOdd(num) ? (i = '2', j = 1) : (i = '3', j = 2);

    for (i; compare(i, half) < 0; i = addNum(i, j)) {
        var divison = divide(num, i);
        divison[1] == 0 ? facts.push(i) && facts.push(divison[0]) : false;
        half = divison[0];
    }
    return facts;
}

function addNum(num, digit) {
    var curDigit = 0,
        uDigit = 0,
        tDigit = digit,
        out = "";
    for(var i = num.length-1; i > -1; i--) {
        curDigit = Number(num[i]) + tDigit;
        uDigit = curDigit % 10;
        tDigit = parseInt(curDigit / 10);
        out = uDigit + out;
    }
    if(tDigit > 0) {
        out = tDigit + out;
    }
    return out;
}

function isOdd(num) {
    var lastDigit = num[num.length-1];
    return Number(lastDigit) % 2;
}

function divide(num, k) {
    var numlen = num.length,
        ans = "",
        stIndex = 0,
        numkeep = num.slice(stIndex,stIndex + 16),
        carryon = "";
    while(numkeep.length > 0) {
        var ansstr = (carryon + numkeep) / k;
        ansstr = ansstr.toString().split(".");
        ans += ansstr[0];
        stIndex += 16 - carryon.length;
        carryon = (carryon + numkeep) % k ? (carryon + numkeep) % k + "" : "";
        numkeep = num.slice(stIndex,stIndex +  - carryon.length);
    }
    if(carryon.length == 0) {
        carryon = 0;
    }
    return [ans, carryon];
}

function compare(num1, num2) {
    if(num1.length == num2.length) {
        for(var i in num1) {
            var a = Number(num1[i]),
                b = Number(num2[i]);
            if(a != b) {
                return a - b;
            }
        }
    } else {
        return num1.length - num2.length;
    }
    return 0;
}
