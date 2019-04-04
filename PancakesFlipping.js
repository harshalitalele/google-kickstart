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
    }
}).on('close',function(){
    process.exit(0);
});

function getMinFlipTimes(pancakes, k) {
    
}
