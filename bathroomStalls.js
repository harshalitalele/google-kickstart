var n = 1000,
    k = 1;

function minMaxDistantSeats() {
    
    var d = getDivisions(k);
    var ans = n / Math.pow(2, d),
        max = Math.floor(ans),
        min = max;
    if((n/k) % 2 != 1 && min != 0) {
        min--;
    }
    console.log(max + ", " + min);
}

function getDivisions(k) {
	return Math.floor(Math.log(k)/Math.log(2)) + 1;
}
