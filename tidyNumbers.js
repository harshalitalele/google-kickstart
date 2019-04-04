var n = 111111111111111110;

function setOtherDigits(num, d) {
    for(var i = d+1; i < num.length; i++) {
        num[i] = 9;
    }
    for(i = d; i > 0; i--) {
        var cur = num[i],
            prev = num[i-1];
        if(cur < prev) {
            num[i-1]--;
            num[i] = 9;
        } else {
            break;
        }
    }
    return num;
}

function getTidyNumber() {
    var num = n.toString().split("");
    if(!isTidy(num)) {
        var prevDigit = Number(num[0]);
        for(var i = 1; i < num.length; i++) {
            var digit = Number(num[i]);
            if(digit < prevDigit) {
                num = setOtherDigits(num, i);
                break;
            } else {
                prevDigit = digit;
            }
        }
    }
    if(num[0] == 0) {
        num = num.slice(1);
    }
    num = num.join("");
    alert(num);
    return num;
}

function isTidy(n) {
    var num = n.toString(),
        prevDigit = num[0];
    for(var i = 1; i < num.length; i++) {
        var digit = num[i];
        if(digit >= prevDigit) {
            prevDigit = digit;
        } else {
            return false;
        }
    }
    return true;
}
