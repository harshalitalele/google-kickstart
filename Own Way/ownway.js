var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

var lineCnt = 0,
    testCases = 0,
    nl, n, l, list, ans;
rl.on('line', function(line) {
    if (lineCnt === 0) {
        testCases = parseInt(line);        
    } else if (lineCnt % 2 == 1) {
        mazeSize = parseInt(line);
    } else if(lineCnt % 2 == 0 && lineCnt <= 2*testCases+1) {
        moves = line.split("");
        ans = findMyPath(mazeSize, moves);
        console.log("Case #" + lineCnt/2 + ": " + ans.join(""));
    } 
    lineCnt++;
    if(lineCnt > 2*testCases) {
        rl.close();
    }
}).on('close',function(){
    process.exit(0);
});

function findMyPath(m, moves) {
    var maze = new Array(m);
    for(var i in maze) {
        maze[i] = new Array(m);
    }
    var lcell = "0,0",
        mycell = "0,0",
        myMoves = [];
    for(i in moves) {
        var lmove = moves[i];
        if(lmove == "E") {
            myMoves.push("S");
        } else {
            myMoves.push("E");
        }
    }
    return myMoves;
}
