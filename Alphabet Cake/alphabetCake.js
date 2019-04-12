var cake = [['A','?','B'], ['?', '?', '?']];

function distributeRemainingSlices() {
    // horizontal fill
    for(var r in cake) {
        var row = cake[r];
        updateRow(row);
    }
    
    var rowLen = cake[0].length,
        prevLiveRow = 0;
    for(r in cake) {
        if(cake[r][0] == '?') {
            if(r > 0) {
                copyPrevRow(cake, r, prevLiveRow);
            } else {
                copyPrevRow(cake, r, prevLiveRow);
            }            
        } else {
            prevLiveRow = r;
        }
    }
    // vertical fill
}

var row = [['A', '?', 'B'], ['?', '?', '?'], ['A', '?', 'B']];
function updateRow() {
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
    console.log(row);
}

function fillStEn(letter, st, en, row) {
    if(st == null) {
        return;
    }
    for(var i = st; i <= en; i++) {
        row[i] = letter;
    }
}

function copyPrevRow(cake, r, rowToCopy) {
    var row = cake[r],
        anotherRow = cake[rowToCopy];
    for(var i in row) {
        row[i] = anotherRow[i];
    }
}
