var readline = require('readline');
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
        console.log("Case #" + case_counter + ": " + evac_plan.join(" "));
        if(case_counter >= num_test_cases) {
            rl.close();
        } else {
            expect = 'num_parties';
        }
    }
}).on('close',function(){
    process.exit(0);
});

//var partyMembers = "4 1 2";

function preparePlan(partyMembers) {
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
            return 1;
        }
    });
    
    //console.log(JSON.stringify(partiesCntArr));
    
    while(remainingMem != 0) {
        var solo = null;
        if(remainingMem == 3) {
            solo = true
        }
        var plan = getCurrentEvacPlan(partiesCntArr, evacIndex, solo),
            e = plan[0];
        partiesCntArr.sort(function(p1, p2) {
            if(p1.cnt > p2.cnt) {
                return -1;
            } else {
                return 1;
            }
        });
        if(!e) {
            break;
        }
        
        evacIndex += plan[1];
        
        evacPlan.push(e);
        remainingMem -= e.length;
    }
    //console.log(evacPlan);
    return evacPlan;
}

function getCurrentEvacPlan(partiesCntArr, i, solo) {
    if(!partiesCntArr[i]) {
        return [false];
    }
    if(!partiesCntArr[i].cnt > 0) {
        return ['', 1];
    } else if(partiesCntArr[i].cnt - partiesCntArr[i+1].cnt >= 2) {
        var e = partiesCntArr[i].n + partiesCntArr[i].n,
            index = 0;
        partiesCntArr[i].cnt -= 2;
        return [e, index];
    } else if(solo) {
        var e = partiesCntArr[i].n,
            index = 0;
        partiesCntArr[i].cnt--;
        return [e, index];
    } else if(partiesCntArr[i+1].cnt > 0) {
        var e = partiesCntArr[i].n + partiesCntArr[i+1].n,
            index = 0;
        partiesCntArr[i].cnt--;
        partiesCntArr[i+1].cnt--;
        return [e, index];
    } else {
        var e = partiesCntArr[i].n,
            index = 0;
        partiesCntArr[i].cnt--;
        return [e, index];
    }
}
