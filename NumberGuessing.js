var readline = require('readline');
var rl = readline.createInterface(process.stdin, process.stdout);

expect = 'begin';
rl.on('line', function(line) {
  if (expect === 'begin') {
    num_test_cases = parseInt(line);
    expect = 'lo_hi';
    case_counter = 0;
  } else if(expect === 'lo_hi') {
    lo_hi = line.split(' ');
    head = parseInt(lo_hi[0]) + 1;
    tail = parseInt(lo_hi[1]);
    mid = Math.floor((head + tail)/2);
    expect = 'num_tries';
  } else if(expect === 'num_tries') {
    num_tries = parseInt(line);
    trial_val = 1;
    expect = 'solve';
    console.log(mid);
  } else if(expect === 'solve') {
      if(line === 'CORRECT') {
          expect = 'lo_hi';
          num_tries = 0;
          case_counter++;
      } else if(line === 'TOO_SMALL') {
          head = mid + 1;
          mid = Math.floor((head + tail)/2);
          console.log(mid);
      } else if(line === 'TOO_BIG') {
          tail = mid - 1;
          mid = Math.floor((head + tail)/2);
          console.log(mid);
      } else if(line === 'WRONG_ANSWER') {
          rl.close();
      }
      /*trial_val++;
      if(trial_val > num_tries) {
          expect = 'lo_hi';
          num_tries = 0;
          case_counter++;
      }*/
      if(case_counter >= num_test_cases) {
          rl.close();
      }
  }
}).on('close',function(){
    process.exit(0);
});
