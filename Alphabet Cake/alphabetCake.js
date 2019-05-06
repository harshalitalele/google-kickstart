var cake = [['?', '?', '?'], ['A','?','B'], ['?', '?', '?'], ['?', 'D', 'E'], ['?', 'J', '?']];

function distributeRemainingSlices() {
    // horizontal fill
    for(var r in cake) {
        var row = cake[r];
        updateRow(row);
    }
    
    // vertical fill
    var rowLen = cake[0].length,
        prevLiveRow = 0,
        st = null,
        en = null;
    for(r in cake) {
        if(cake[r][0] != '?' && cake[r][0] != undefined) {
            copyPrevRow(cake, st, en);
            st = null;
            en = null;
        } else {
            if(st != null) {
                en = r;
            } else {
                st = r;
                en = r;
            }
        }
        console.log(cake[r]);
    }
    if(st != null) {
        copyPrevRow(cake, st, en);
    }
}

function updateRow(row) {
    var st = null, 
        en = null;
    for(var i in row) {
        var slice = row[i];
        if(slice != '?') {
            fillStEn(slice, st, en, row);
            st = null;
            en = null;
        } else {
            if(st != null) {
                en = i;
            } else {
                st = i;
                en = i;
            }
        }
    }
    if(st != null) {
        fillStEn(row[st-1], st, en, row);
    }
}

function fillStEn(letter, st, en, row) {
    if(st == null) {
        return;
    }
    for(var i = st; i <= en; i++) {
        row[i] = letter;
    }
}

function copyPrevRow(cake, st, en) {
    var rowToCopy;
    if(st == null) {
        return;
    }
    if(en < cake.length-1) {
        rowToCopy = cake[Number(en) + 1];
    } else {
        rowToCopy = cake[st - 1];
    }
    
    for(var j in rowToCopy) {
        var letter = rowToCopy[j];
        for(var i = st; i <= en; i++) {
            cake[i][j] = letter;
        }
    }
}
