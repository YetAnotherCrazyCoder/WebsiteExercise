var message;

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

    if(!message || message==="reset"){
        postMessage("Time from WebWorker: " + h + ":" + m + ":" + s);
    } else {
        postMessage("Got: " + message + ".");
    }

    setTimeout("getTime()",1000);
}

onmessage = function(e) {
    message = e.data;
  }

getTime();