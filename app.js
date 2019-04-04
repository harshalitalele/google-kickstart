//To Do: Try to get all -'s together and then solve

var s = "++-++-+-+++--++---",
    k = 5,
    selectionStart = false,
    selectedChars = [];

function strSplice(s, start, delCount, newSubStr) {
    return s.slice(0, start) + newSubStr + s.slice(parseInt(start) + Math.abs(delCount));
};

function selectSeries(elem) {
    var charIndex = this.index;
    selectionStart = !selectionStart;
    
    if(selectionStart) {
        selectedChars = [];
        selectedChars.push(charIndex);
    } else {
        selectionStart = false;
        selectedChars.push(charIndex);
        flipChars();
    }
}

function flipChars() {
    var i1 = parseInt(selectedChars[0]),
        i2 = parseInt(selectedChars[1]),
        charElems = document.getElementById("sample").children;
    if(i1 > i2) {
        var temp = i1;
        i1 = i2;
        i2 = temp;
    }
    
    if(i2 - i1 + 1 > k || i2 - i1 + 1 < k) {
        selectedChars = [];
        alert("incorrect selection, select again!");
    } else {
        for(var i = i1; i <= i2; i++) {
            var currentChar = s[i];
            if(currentChar == '+') {
                s = strSplice(s, i,1,'-');
            } else {
                s = strSplice(s, i,1,'+');
            }
            charElems[i].innerHTML = s[i];
        }
    }
}

function generatePuzzle() {
    var parentElem = document.getElementById("sample");
    
    for(var i in s) {
        var charElem = document.createElement("span");
        charElem.innerHTML = s[i];
        charElem.index = i;
        charElem.addEventListener("click", selectSeries);
        parentElem.appendChild(charElem);        
    }
}

generatePuzzle();
