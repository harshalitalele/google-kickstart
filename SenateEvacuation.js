/*var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);
var parties = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

expect = 'begin';
rl.on('line', function(line) {
    if (expect === 'begin') {
        num_test_cases = parseInt(line);
        expect = 'num_parties';
        case_counter = 0;
    } else if (expect === 'num_parties') {
        num_parties = parseInt(line);
        expect = 'party_members';
    } else if(expect === 'party_members') {
        evac_plan = preparePlan(line);
        case_counter++;
        console.log("Case #" + case_counter + ": " + evac_plan);
        if(case_counter >= num_test_cases) {
            rl.close();
        }
    }
}
}).on('close',function(){
    process.exit(0);
});*/

var partyMembers = '4 3 3';
var parties = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function preparePlan() {
    var memberCnt = partyMembers.split(' '),
        totMem = 0,
        partiesCntArr = [],
        evacPlan = [];
    
    for(var m in memberCnt) {
        var cnt = parseInt(memberCnt[m]);
        totMem += cnt;
        var party = {
            n: parties[m],
            cnt: cnt
        }
        partiesCntArr.push(party);
    }
    var remainingMem = totMem,
        evacIndex = 0;
    
    partiesCntArr.sort(function(p1, p2) {
        if(p1.cnt > p2.cnt) {
            return -1;
        } else {
            1;
        }
    });
    
    while(remainingMem != 0) {
        var e = '';
            if(partiesCntArr[evacIndex].cnt >= 2) {
                e = partiesCntArr[evacIndex].n + partiesCntArr[evacIndex].n;
                evacPlan.push(e);
                partiesCntArr[evacIndex].cnt -= 2;
            } else if(partiesCntArr[evacIndex].cnt > 0) {
                e = partiesCntArr[evacIndex].n + partiesCntArr[evacIndex+1].n;
                evacPlan.push(e);
                partiesCntArr[evacIndex].cnt -= 1;
                partiesCntArr[evacIndex+1].cnt -= 1;
                evacIndex++;
            } else {
                evacIndex++;
                e = partiesCntArr[evacIndex].n + partiesCntArr[evacIndex].n;
                evacPlan.push(e);
                partiesCntArr[evacIndex].cnt -= 2;
            }
        remainingMem -= 2;
    }
    alert(evacPlan);
}
