var n = 4,
    k = 2;

function seat(i) {
    this.index = i;
    this.ls = 0;
    this.rs = 0;
}

function minMaxDistantSeats() {
    var stalls = new Array(n+2),
        curBestSeat = 1;
    stalls[0] = 1;
    stalls[stalls.length-1] = 1;
    for(var i = 1; i < stalls.length-2;i++) {
        stalls[i] = 0;
    }
    
    for(i = 0; i < k; i++) {
        var seatId = markBestSeat(stalls);
        if(i == k-1) {
            // return with min max
        } else {
            getBestSeat(stalls);
        }
    }
    // getLsRs(stalls, 1);
}

function getBestSeat(stalls) {
    
}

function getLsRs(stalls, i) {
    //
}
