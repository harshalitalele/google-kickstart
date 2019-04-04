var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

expect = 'begin';
rl.on('line', function(line) {
    if (expect === 'begin') {
        num_test_cases = parseInt(line);
        expect = 'case_input';
        case_counter = 0;
    } else {
        case_counter++;
        var caseInput = line.split(" "),
            pancakeOrder = caseInput[0],
            flipperSize = parseInt(caseInput[1]);
        var ans = getMinFlipTimes(pancakeOrder, flipperSize);
        console.log("Case #" + case_counter + ": " + ans);
        if(case_counter == num_test_cases) {
            rl.close();
        }
    }
}).on('close',function(){
    process.exit(0);
});

function strSplice(s, start, delCount, newSubStr) {
    return s.slice(0, start) + newSubStr + s.slice(parseInt(start) + Math.abs(delCount));
};

function getMinFlipTimes(pancakes, k) {
    var fblank = pancakes.indexOf('-'),
        flipCnt = 0;
    while(fblank != -1) {
        if(pancakes.length < fblank+k-1) {
            return "impossible";
        } else {
            flipCnt++;
            for(var i = fblank; i < fblank+k; i++) {
                var currentChar = pancakes[i];
                if(currentChar == '+') {
                    pancakes = strSplice(pancakes, i,1,'-');
                } else {
                    pancakes = strSplice(pancakes, i,1,'+');
                }
            }
            fblank = pancakes.indexOf('-')
        }        
    }
    return flipCnt;
}
