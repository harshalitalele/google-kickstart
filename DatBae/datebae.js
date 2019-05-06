var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

var expect = 0,
    testCases = 0,
    curCase = 0,
    nbf, n, b, f, list, ans, bitResp,
    bitCheck;
rl.on('line', function(line) {
    if (expect === 0) {
        testCases = parseInt(line);
        expect = 1;
    } else if (expect === 1) {
        nbf = line.split(" ");
        n = Number(nbf[0]);
        b = Number(nbf[1]);
        f = Number(nbf[2]);
        bitCheck = testWorkers(n, b, f);
        console.log(bitCheck);
        expect = 2;
    } else if(expect === 2) {
        bitResp = line.split("");
        if(bitResp == 1) {
            expect = 1;
            curCase++;
        }
        bitCheck = testWorkers(n, b, f, bitResp);
        console.log(bitCheck);
    }
    if(curCase > testCases) {
        rl.close();
    }
}).on('close',function(){
    process.exit(0);
});

var workers = [],
    prevIn = [];
function testWorkers(n, b, f, resp) {
    var out = [],
        miniGrp = Math.ceil(n/(n-b));
    if(!resp || workers.length == 0) {
        workers = new Array(n);
        for(var i = 0; i < n; i++) {
            workers[i] = 0;
        }
    } else {
        analyzeWorkers(workers, resp);
    }
    var bit = 0;
    for(var w = 0; w < n; w++) {
        var isBad = workers[w] == 0;
        if(isBad) {
            out.push(bit % 2);
        } else {
            out.push(1);
        }
    }
    prevIn = out.join("");
    return out;
}

function analyzeWorkers(workers, resp) {
    for(var i in workers) {
        //
    }
}
