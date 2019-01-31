function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);

    postMessage(h + ":" + m + ":" + s);
    setTimeout("getTime()",200);
}

getTime();