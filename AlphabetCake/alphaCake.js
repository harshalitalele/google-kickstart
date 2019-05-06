/*var fs  = require("fs");

// expect possibilities:
// on of cases
// r n c
// r rows
// r n c
// r rows

var expect = 0,
    caseCnt = 0,
    noOfCases = 0,
    curData = [],
    rcnt = 0;
fs.readFileSync('./file.in').toString().split('\n').forEach(function (line) {
    if(expect === 0) {
        noOfCases = parseInt(line);
        expect = "rnc";
    } else if(expect === "rnc") {
        var input = line.split(" ");
        rcnt = Number(input[0]);
        var ccnt = Number(input[1]);
        curData = [];
        expect = "data";
    } else if(expect === "data") {
        curData.push(line.split(""));
        if(curData.length == rcnt) {
            var ans = getDistributedCake(curData);
            caseCnt++;
            fs.appendFileSync("./file.out", "Case #" + caseCnt + ": \n" + ans + "\n");
            expect = "rnc";
            if(caseCnt == noOfCases) {
                expect = null;
            }
        }
    }
});*/

//var cakeArr = [['G', '?', '?'],['?','C', '?'],['?','?','J']];
var cakeArr = [['C', 'O', '?', 'E'], ['?', '?','?','?']];
function getDistributedCake() {
    var ansCake = [];
    for(var i in cakeArr) {
        var cRow = cakeArr[i];
        ansCake[i] = new Array(cRow.length);
        for(var j in cRow) {
            var piece = cRow[j];
            if(piece != '?') {
                ansCake[i][j] = piece;
            } else {
                ansCake[i][j] = getNearestPiece(Number(i), Number(j), cakeArr);
                cakeArr[i][j] = ansCake[i][j];
            }
        }
    }
    console.log(ansCake);
    return ansCake;
}

function getNearestPiece(r, c, arr) {
    var nearestPiece = null;
    for(var i = 1; c-i >= 0 || i+c < arr[r].length; i++) {
        if(arr[r][c+i] != '?' && arr[r][c+i] != undefined) {
            nearestPiece = arr[r][c+i];
            break;
        }
        if(arr[r][c-i] != '?' && arr[r][c-i] != undefined) {
            nearestPiece = arr[r][c-i];
            break;
        }
    }
    if(nearestPiece === null) {
        for(i = 1; r-i >= 0 || r+i < arr.length; i++) {
            if(arr[r+i] != undefined && arr[r+i][c] != '?') {
                nearestPiece = arr[r+i][c];
                break;
            }
            if(arr[r-i] != undefined && arr[r-i][c] != '?') {
                nearestPiece = arr[r-i][c];
                break;
            }
        }
    }
    return nearestPiece;
}
