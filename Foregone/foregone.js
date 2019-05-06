var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

var lineCnt = 0,
    testCases = 0,
    n = 0,
    ans;
rl.on('line', function(line) {
    if (lineCnt === 0) {
        testCases = parseInt(line);        
    } else if (lineCnt >= 1 && lineCnt <= testCases+1) {
        n = parseInt(line);
        ans = foregone(n);
        console.log("Case #" + lineCnt + ": " + ans[0] + " " + ans[1]);
    }
    lineCnt++;
    if(lineCnt > testCases+1) {
        rl.close();
    }
}).on('close',function(){
    process.exit(0);
});

function foregone(n) {
    var a = n.toString(),
        b = "",
        nlen = a.length,
        findex = a.indexOf(4),
        prevIn = findex;
    while(findex > -1) {
        b += fillZeroes(findex - prevIn - 1) + "2";
        a = a.replace('4','2');
        prevIn = findex;
        findex = a.indexOf(4);
    }
    b += fillZeroes(nlen - prevIn - 1);
    if(b.length == 0) {
        b = "0";
    }
    return [a, b];
}

function fillZeroes(zcnt) {
    var out = "";
    for(var i = 0; i < zcnt; i++) {
        out += "0";
    }
    return out;
}